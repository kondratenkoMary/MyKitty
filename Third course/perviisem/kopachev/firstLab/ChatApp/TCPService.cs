using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ChatApp
{
    public class TCPService
    {
        private TcpListener _Listener;
        private bool _IsStopped;
        private List<TcpClient> _Clients;

        public void Start()
        {
            _Clients = new List<TcpClient>();

            _Listener = new TcpListener(IPAddress.Parse("127.0.0.1"), 8080);
            _Listener.Start();

            Task.Run(AcceptLoop);
        }
        private void AcceptLoop()
        {
            while (!_IsStopped)
            {
                Console.WriteLine("Waiting for a connection... ");
                var client = _Listener.AcceptTcpClient();

                _Clients.Add(client);
                Console.WriteLine("Connected!");

                Task.Run(() => ListenLoop(client));
            }
        }
        private void ListenLoop(TcpClient client)
        {
            var clientStream = client.GetStream();
            int bytesRead;
            while (!_IsStopped)
            {
                byte[] buffer = new byte[258];
                bytesRead = 0;

                try
                {
                    bytesRead = clientStream.Read(buffer, 0, 258);
                }
                catch
                {
                    break;
                }

                if (bytesRead == 0)
                {
                    Thread.Sleep(15);
                    continue;
                }
                var message = Encoding.UTF8.GetString(buffer, 0, bytesRead);
                Console.WriteLine($"Получено сообщение ({message})");

                _Clients.ForEach(x =>
                {
                    x.GetStream().Write(buffer, 0, bytesRead);
                });

                Thread.Sleep(15);
            }
            client.Close();
            _Clients.Remove(client);
        }
        public void Stop()
        {
            _Clients = new List<TcpClient>();
            _IsStopped = true;
            _Listener.Stop();
        }
    }
}
