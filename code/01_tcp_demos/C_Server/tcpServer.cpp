

#include <winsock2.h>
#include <stdio.h>
#include <stdlib.h>
#pragma comment(lib, "Ws2_32.lib")
#include <iostream>
using namespace std;


int main ( int argc, char *argv[] )
{

	SOCKET listeningSocket;
	SOCKET sendSocket;

	fprintf(stdout, "connection server starting.\n");

	WSADATA	wsaData;

	if( WSAStartup(MAKEWORD(1,1),&wsaData) != 0 ) {
		fprintf(stderr, "ERROR:  WSAStartup Failed %d\n", WSAGetLastError());
		return 0;
	}

	fprintf(stdout, "WSAStartup succeeded, network initialized\n");


	/***********
	*  Open Listening Socket
	*/

	struct sockaddr_in addr;
	int port = 3000;

	fprintf(stdout, "binding listening socket to port %d\n", port);
    
    
	if ((listeningSocket = socket(AF_INET, SOCK_STREAM, 0)) == INVALID_SOCKET) {
		fprintf(stderr, "failed creating listening socket (%d)\n", WSAGetLastError());
		return(1);
    }


	ZeroMemory(&addr, sizeof(struct sockaddr_in));
	memset(&addr, 0 , sizeof(struct sockaddr_in));
	addr.sin_family      = AF_INET;
	addr.sin_addr.s_addr = htonl(INADDR_ANY);
	addr.sin_port = htons(port);
	if (bind(listeningSocket, (struct sockaddr *) &addr, sizeof(addr)) == SOCKET_ERROR) {
		fprintf(stderr, "failed binding listening socket to port %d  (%d)\n", port, WSAGetLastError());
		return(1);
	}	
  

	/**********
	*  Listening for connections
	*/

	fprintf(stdout, "listening socket openned and now listening for incoming connections.\n");


	HANDLE acceptEvent = CreateEvent(NULL, FALSE, FALSE, NULL);

	if(WSAEventSelect(listeningSocket, acceptEvent, FD_ACCEPT) == SOCKET_ERROR){
		fprintf(stderr, "failed creating and associating accept event (%d)", WSAGetLastError());
		return 1;
	}

	listen(listeningSocket, SOMAXCONN);
	int retval;
	int addrlen;
	
	
	while (1)
	{
	
		retval = WaitForSingleObject(acceptEvent, INFINITE);

		if ( retval != WAIT_OBJECT_0 ) {
			fprintf(stderr, "failed waiting for incoming connection. (%d)\n", WSAGetLastError());
		}

		
		sendSocket = accept(listeningSocket, NULL, NULL);

		switch (sendSocket)	{
			case WSAEWOULDBLOCK:
			case INVALID_SOCKET:
				fprintf(stderr, "failed to establish connection (%d)\n", WSAGetLastError());
				return 1;
		}

		char input[50];
		char output[50];
		int length = recv(sendSocket, input, 50, 0);
		
		for ( int i = 0; i < length;i++ ) {
			output[i] = toupper(input[i]);
		}
		cout << "Responding to client -> " << output << endl;
		send(sendSocket, output, length, 0);

		closesocket(sendSocket);
	}

	WSACleanup();
}