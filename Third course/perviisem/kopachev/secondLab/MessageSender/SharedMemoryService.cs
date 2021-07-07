using System;
using System.Collections.Generic;
using System.IO;
using System.IO.MemoryMappedFiles;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MessageSender
{
    public class SharedMemoryService: IDisposable
    {
        public string ShareName { get; private set; }
        private MemoryMappedFile _Mmf;

        public SharedMemoryService(string shareName)
        {
            ShareName = shareName;
        }
        public void SetShareName(string name)
        {
            ShareName = name;
        }
        public void Write(string text)
        {
            if (_Mmf != null) _Mmf.Dispose();

            _Mmf = MemoryMappedFile.CreateOrOpen(ShareName, 1000);


            using (MemoryMappedViewAccessor accessor = _Mmf.CreateViewAccessor())
            {

                byte[] Buffer = ASCIIEncoding.ASCII.GetBytes(text);
                accessor.Write(54, (ushort)Buffer.Length);
                accessor.WriteArray(54 + 2, Buffer, 0, Buffer.Length);
            }

        }
        public string Read()
        {
            try
            {

                using (MemoryMappedFile mmf = MemoryMappedFile.OpenExisting(ShareName))
                {


                    using (MemoryMappedViewAccessor accessor = mmf.CreateViewAccessor())
                    {
                        ushort Size = accessor.ReadUInt16(54);
                        byte[] Buffer = new byte[Size];
                        accessor.ReadArray(54 + 2, Buffer, 0, Buffer.Length);
                        return ASCIIEncoding.ASCII.GetString(Buffer);
                    }
                }
            }catch(FileNotFoundException ex)
            {
                return "File not found";
            }

        }

        public void Dispose()
        {
            if (_Mmf != null) _Mmf.Dispose();
        }
    }
}
