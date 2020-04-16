using System;
using System.Collections.Generic;

using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace URL_shorten
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            libCommon.clsWebFunc objWebFunc = new libCommon.clsWebFunc();
            string longURL = objWebFunc.getRequest(Request, "longURL");
            string shortURL = insertURL(longURL);

            Response.Clear();
            Response.Write(shortURL);
            Response.End();
        }

        private bool isDupeURL(System.Data.SqlClient.SqlConnection dbCon, System.Data.SqlClient.SqlTransaction TRX, string longURL)
        {
            libCommon.clsDB objDB = new libCommon.clsDB();
            System.Data.DataSet DS = new System.Data.DataSet();

            string QUERY = "SELECT COUNT(*) FROM tb_URL WHERE longURL='" + longURL + "'";

            DS = objDB.ExecuteDSQuery(dbCon, TRX, QUERY);
            if (libMyUtil.clsCmnDB.validateDS(DS))
                return true;
            else
                return false;
        }

        private string insertURL(string longURL)
        {
            libCommon.clsDB objDB = new libCommon.clsDB();
            System.Data.SqlClient.SqlConnection dbCon = libMyUtil.clsCmnDB.getConnection("sa", "rhksflwk", "urlShorten", "192.168.10.10");
            System.Data.SqlClient.SqlTransaction TRX;

            Random objRandom = new Random();
            byte[] shortURL_byte;
            string shortURL;
            string Result;

            shortURL_byte = System.BitConverter.GetBytes(new UInt32());
            objRandom.NextBytes(shortURL_byte);
            shortURL = libMyUtil.clsFile.toBase62(System.BitConverter.ToUInt32(shortURL_byte, 0));

            dbCon.Open();
            
            TRX = dbCon.BeginTransaction();
            Result = libMyUtil.clsCmnDB.INSERT_DB(dbCon, TRX, "tb_URL", "longURL|shortURL", longURL + "|" + shortURL);
            if (Result.Equals("FAIL"))
            {
                TRX.Rollback();
                shortURL = "";
            }
            else
                TRX.Commit();

            dbCon.Close();

            return shortURL;
        }
    }
}