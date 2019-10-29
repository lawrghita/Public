lparameters loUpdateObject

Text to lcRegisterWithThor NoShow TextMerge
    
    Messagebox('From the Thor menu, see "More -> Open Folder -> Components"', 0 ,"FoxyXLS installed", 5000)

EndText

lcRegisterWithThor = Strtran(lcRegisterWithThor, '@@@')

With loUpdateObject
    .ApplicationName      = 'FoxyXLS'
    .Component            = 'Yes'
    .VersionLocalFilename = 'FoxyXLSVersionFile.txt'
    .RegisterWithThor     = lcRegisterWithThor
    
    .VersionNumber        = '0.10 Alpha'
    .VersionDate          = Date(2013,5,20)
    .SourceFileUrl        = 'http://vfpxrepository.com/dl/thorupdate/Components/FoxyXLS.zip'
    .Notes                = GetNotes()
Endwith

Return loUpdateObject


Procedure GetNotes

    Local lcNotes
    Text to lcNotes NoShow

    EndText
    Return lcNotes
EndProc
