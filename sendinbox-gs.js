/************************************************************************************************
  * Jangan merubah apa pun di dalam script ini terkecuali anda paham dengan bahasa javascript 
  * atau paham google script. 
  **********************************************************************************************
  * @Author: Eka Syahwan
  * @Date:   2018-09-28 18:30:34
  * @Last Modified by:   Eka Syahwan
  * @Last Modified time: 2018-10-18 04:58:11
  * @Website : bmarket.or.id / emailist.org
  *
***********************************************************************************************/

function sendWithMailApp(e){
  
  var encode_subject      = '=?utf-8?B?' + Utilities.base64Encode(e.parameter.subject, Utilities.Charset.UTF_8) + '?=';
  var encode_fname        = '=?utf-8?B?' + Utilities.base64Encode(e.parameter.reaply_name, Utilities.Charset.UTF_8) + "?=";
  var emailQuotaRemaining = MailApp.getRemainingDailyQuota();

  if( e.parameter.fileID && e.parameter.fileID != "" ){
    var file = DriveApp.getFileById( e.parameter.fileID );    
    var using = 'MailApp using attachments';

    MailApp.sendEmail({
      to: e.parameter.to,
      subject: encode_subject,
      htmlBody: e.parameter.letter,
      name: encode_fname,
      noReply: true,
      attachments: [file.getAs(MimeType.PDF)],
      replyTo: e.parameter.reaply_email,
    });

  }else{
    var using = 'MailApp using non attachments';
    MailApp.sendEmail({
      to: e.parameter.to,
      subject: encode_subject,
      htmlBody: e.parameter.letter,
      name: encode_fname,
      noReply: true,
      replyTo: e.parameter.reaply_email,
    });
  
  }

  return ContentService
          .createTextOutput(JSON.stringify({
            "using": using,
            "result":"true", 
            "message": "Send Success!",
            "email": e.parameter.to , 
            "emailQuota": emailQuotaRemaining
    })).setMimeType(ContentService.MimeType.JSON);

}
function sendWithGmailApp(e){

  var encode_subject      = '=?utf-8?B?' + Utilities.base64Encode(e.parameter.subject, Utilities.Charset.UTF_8) + '?=';
  var encode_fname        = '=?utf-8?B?' + Utilities.base64Encode(e.parameter.reaply_name, Utilities.Charset.UTF_8) + "?=";
  var emailQuotaRemaining = MailApp.getRemainingDailyQuota();

  
  if( e.parameter.fileID && e.parameter.fileID != "" ){
    var using = 'GmailApps using attachments';
    var file = DriveApp.getFileById( e.parameter.fileID ); 
    GmailApp.sendEmail(e.parameter.to , encode_subject , '' , { 
        htmlBody: e.parameter.letter,
        name: encode_fname,
        attachments: [file.getAs(MimeType.PDF)],
      });
  }else{
      var using = 'GmailApps using non attachments';
      GmailApp.sendEmail(e.parameter.to , encode_subject , '' , { 
        htmlBody: e.parameter.letter,
        name: encode_fname,
      });
  }

  return ContentService
          .createTextOutput(JSON.stringify({
            "using": using,
            "result":"true", 
            "message": "Send Success!",
            "email": e.parameter.email , 
            "emailQuota": emailQuotaRemaining
    })).setMimeType(ContentService.MimeType.JSON);

}

function doPost(e) {
  if(e.parameter.methode == 'mailapp'){
    return sendWithMailApp(e)
  }
  if(e.parameter.methode == 'gmailapp'){
    return sendWithGmailApp(e);
  }
}