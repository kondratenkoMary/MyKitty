using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace ChatClient
{
    public class TCPService: IDisposable
    {
        private bool _IsStopped = false;
        private TcpClient _Client;
        private NetworkStream _ClientStream;

        public bool Connect(string ipAddress, int port)
        {
            try
            {
                _Client = new TcpClient(ipAddress, port);
                _ClientStream = _Client.GetStream();

                Task.Run(ListenLoop);
                
                return true;
            }
            catch
            {
                if (_Client != null)
                    _Client.Dispose();
                return false;
            }
        }
        public void Send(string message)
        {
            try
            {
                var bytes = Encoding.UTF8.GetBytes(message);
                _ClientStream.Write(bytes, 0, bytes.Length);
            }
            catch(Exception ex)
            {
            }
        }

        private void ListenLoop()
        {
            
            int bytesRead;
            while (!_IsStopped)
            {
                byte[] buffer = new byte[258];
                bytesRead = 0;

                try
                {
                    bytesRead = _ClientStream.Read(buffer, 0, 258);
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

                var message = Encoding.UTF8.GetString(buffer,0, bytesRead);
                OnDataReceived?.Invoke(message);

                Thread.Sleep(15);
            }
        }

        public void Dispose()
        {
            _IsStopped = true;
            Thread.Sleep(500);

            _ClientStream.Dispose();
            _Client.Dispose();
        }

        public delegate void ClientHandlePacketData(string message);
        public event ClientHandlePacketData OnDataReceived;
    }
}
