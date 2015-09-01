
#include <winsock2.h>
#include <ws2tcpip.h>
#include <stdio.h>
#pragma comment(lib, "Ws2_32.lib")
#include <iostream>
using namespace std;


int MAXHOSTNAMELEN = 50;

char *getInternetName(char *machine, char *inetName, int inetNameLen)
{
    char           *retval = NULL;
    struct hostent *netname;
    int             addressLen;
    char           *givenAddress = NULL;
    unsigned char   part;
    int             i, j;

    if (machine == NULL) {
		givenAddress = (char *) malloc(MAXHOSTNAMELEN);
		if(givenAddress == NULL){
			return NULL;
		}
		if(gethostname(givenAddress, MAXHOSTNAMELEN)==SOCKET_ERROR){
			printf("gethostname failed - (%d)\n",WSAGetLastError());
		}
		netname = gethostbyname(givenAddress);
		free(givenAddress);
    } 
	else {
		netname = gethostbyname(machine);
	}

    if (netname == NULL) {
		printf("Error Getting host name (%s)for machine %d\n",machine,WSAGetLastError());
		return(NULL);
    }
    /* else */
   
    /* Determine the length of the internet address in dot notation */
    for (i=0, addressLen = 0; i<4; i++) {
		part = netname->h_addr[i];
		for (j=0; part > 0; j++) part /= 10;
		addressLen += j;
    }
    addressLen += 3; /* For the three dots */

    if (inetName == NULL)
		retval = (char *) malloc(addressLen + 1);
    else if (inetNameLen > addressLen)
		retval = inetName;
    else
	/* Not enough space in inetName to return full address */
	return(NULL);
	
    /* Get destination address name in the right form */
    sprintf(retval, "%u.%u.%u.%u", (unsigned char) netname->h_addr[0], 
	    (unsigned char) netname->h_addr[1],
	    (unsigned char) netname->h_addr[2], 
	    (unsigned char) netname->h_addr[3]);
    
    return(retval);
}




SOCKET openSocket(short port)
{
	struct sockaddr_in addr;
	SOCKET sock = 0;
    
    if ((sock = socket(AF_INET, SOCK_STREAM, 0)) == INVALID_SOCKET) {
		return(-1);
    }
	ZeroMemory(&addr, sizeof(struct sockaddr_in));
	memset(&addr, 0 , sizeof(struct sockaddr_in));
	addr.sin_family      = AF_INET;
	addr.sin_addr.s_addr = htonl(INADDR_ANY);
	addr.sin_port = htons(port);
	if (bind(sock, (struct sockaddr *) &addr, sizeof(addr)) == SOCKET_ERROR) {
		return(-1);
	}	
    return(sock);
}



/** Trys to connect to the given remote host on the given port once.  returns
    0 if successful
*/
SOCKET connect_socket(SOCKET retSock, char * remotehost, int port)
{

	char hostname[256];
	
	struct sockaddr_in addr;
	if ( getInternetName(remotehost, hostname, 256) == NULL ) {
		closesocket(retSock);
		return 0;
	}


	ZeroMemory(&addr, sizeof(struct sockaddr_in));
	memset(&addr, 0 , sizeof(struct sockaddr_in));
	addr.sin_family      = AF_INET;
	addr.sin_addr.s_addr = inet_addr(hostname);
	addr.sin_port = htons(port);
	
	return connect(retSock, (struct sockaddr *) &addr, sizeof(addr));
	
}


int main ( int argc, char *argv[] )
{
	int port = 3000;
	char server[256];
	
	if ( argc == 1 ) {
		strcpy(server, "localhost");
	}
	else {
		strcpy(server, argv[1]);
	}

	WSADATA	wsaData;

	if( WSAStartup(MAKEWORD(1,1),&wsaData) != 0 ) {
		fprintf(stderr, "ERROR:  WSAStartup Failed %d\n", WSAGetLastError());
		return 0;
	}

	SOCKET s;

	fprintf(stdout, "Echo with %s started.\n", server);

	
	bool failed = false;
	char input[50];
	char output[50];
	while ( 1 )
	{	
		cout << "Enter some text:  " ;
		cin.getline(input, 50);
		if ( strcmp(input, "QUIT") == 0 ) {
			break;
		}

		failed = false;
		s = openSocket(ADDR_ANY);

		if ( s == NULL ) {
			fprintf(stdout, "Failed to create socket. (%d)\n", WSAGetLastError());
			continue;
		}

		if ( connect_socket(s, server, port) != 0 ) {
			fprintf(stderr, "Failed to connect to %s.\n", server);
			closesocket(s);
			continue;
		}
		
		int length = strlen(input) + 1;
		send(s, input, length, 0);
		if ( recv(s, output, length, 0) != length ) {
			failed = true;
			fprintf(stderr, "Failed to get response to %s.\n", server);
			continue;
		}
		cout << "Server responded:  " << output << endl;
		
		closesocket(s);
		
	} 
	
}







