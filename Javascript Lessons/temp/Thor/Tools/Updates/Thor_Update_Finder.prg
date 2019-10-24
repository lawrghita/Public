#Define VersionFileName 'FinderVersionFile.txt'
Lparameters loUpdateObject

Text to lcRegisterWithThor NoShow TextMerge
    Messagebox('Tool "Finder" installed', 0 ,"Finder...", 3000)
EndText

With loUpdateObject
    .ApplicationName      = 'Finder'
    .ToolName             = 'Thor_Tool_ThorInternalRepository'
    .VersionFileURL       = 'http://vfpxrepository.com/dl/thorupdate/Tools/Finder/FinderVersionFile.Txt'
    .VersionLocalFilename = VersionFileName
    .RegisterWithThor     = lcRegisterWithThor
    .Notes                = GetNotes()
Endwith

Return loUpdateObject


Procedure GetNotes

    Local lcNotes

Text to lcNotes NoShow TextMerge
EndText

    Return lcNotes
EndProc
