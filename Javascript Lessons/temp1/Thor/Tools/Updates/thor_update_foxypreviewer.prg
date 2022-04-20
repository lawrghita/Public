Lparameters loUpdateObject

Text to lcRegisterWithThor NoShow TextMerge
    
    Messagebox('From the Thor menu, see "More -> Open Folder -> Components"', 0 ,"FoxBarCode installed", 5000)

EndText

lcRegisterWithThor = Strtran(lcRegisterWithThor, '@@@')

With loUpdateObject
    .ApplicationName      = 'FoxyPreviewer'
    .Component            = 'Yes'
    .VersionLocalFilename = 'FoxyPreviewerVersionFile.txt'
    .RegisterWithThor     = lcRegisterWithThor
    
	.VersionNumber 		  = 'v2.99z30' && this must be character!
	.VersionDate          = Date(2013, 9, 23) && this avoids date formatting issues
	.ProjectCreationDate  = Date(2014, 3, 24)

    .SourceFileUrl        = 'http://vfpxrepository.com/dl/thorupdate/Components/FoxyPreviewer v299z30.zip'
    .Link                 = 'https://foxypreviewer.codeplex.com/'
    .LinkPrompt           = 'FoxyPreviewer Home Page'
    .Notes                = GetNotes()
Endwith

Return loUpdateObject


Procedure GetNotes

    Local lcNotes
    Text to lcNotes NoShow
Export your Visual FoxPro reports to Images, RTF, PDF, HTML or XLS super easy! Send them by email! Enhance the look of your previews, and allow your users to decide how their report previews will be.
    EndText
    Return lcNotes
EndProc
