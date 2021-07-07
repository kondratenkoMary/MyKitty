using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Pipes;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MessageSender
{
    public class PipeService: IDisposable
    {
        public string PipeSend { get; private set; }
        public string PipeReceive { get; private set; }
        private Task _ReaderLoop;
        private CancellationTokenSource Canceller { get; set; }
        public bool IsStopped { get; set; }

        public PipeService(string pipeSend, string pipeReceive)
        {
            PipeSend = pipeSend;
            PipeReceive = pipeReceive;

            _ReaderLoop = Task.Run(Loop);
        }
        public void SetPipeSend(string pipeSendName)
        {
            PipeSend = pipeSendName;
        }
        public void SetPipeReceive(string pipeReceiveName)
        {
            
            
            IsStopped = true;
            //restart loop. no real way to release waiter except this hint
            using (NamedPipeClientStream npcs = new NamedPipeClientStream(PipeReceive))
            {
                npcs.Connect(100);
            }
            Thread.Sleep(1000);
            _ReaderLoop.Dispose();

            IsStopped = false;
            PipeReceive = pipeReceiveName;
            _ReaderLoop = Task.Run(Loop);
        }

        public void Send(string text)
        {
            using (var client = new NamedPipeClientStream(PipeSend))
            {
                try
                {
                    client.Connect(1000);
                    using (StreamWriter writer = new StreamWriter(client))
                    {
                        writer.WriteLine(text);
                        writer.Flush();
                    }
                }
                catch ( TimeoutException ex)
                {

                }
                finally { }
            }
                
        }

        public void Loop()
        {
            try
            {
                while (!IsStopped)
                {
                    using (var server = new NamedPipeServerStream(PipeReceive))
                    {


                        server.WaitForConnection();

                        if (IsStopped)
                        {
                            return;
                        }
                        using (StreamReader sr = new StreamReader(server))
                        {
                            var text = sr.ReadLine();
                            OnReceive(this, text);
                            server.Close();
                        }
                    }
                }


            }
            finally
            {

            }
        }

        public void Dispose()
        {
            IsStopped = true;
            //restart loop. no real way to release waiter except this hint
            try
            {
                using (NamedPipeClientStream npcs = new NamedPipeClientStream(PipeReceive))
                {
                    npcs.Connect(100);
                }
            }
            catch { }
            Thread.Sleep(1000);
            _ReaderLoop.Dispose();
        }

        public delegate void ReceiveEventHandler(object sender, string text);

        // Declare the event.
        public event ReceiveEventHandler OnReceive;
    }
}
