#Define VersionFileName 'IntellisenseXVersionFile.txt'
Lparameters loUpdateObject

Text to lcRegisterWithThor NoShow TextMerge
    Erase (_screen.Cthorfolder + '\Tools\Procs\beautify.h')
    Erase (_screen.Cthorfolder + '\Tools\Procs\beautifyx.h')
    Erase (_screen.Cthorfolder + '\Tools\Procs\THOR_PROC_ISX.h')
EndText

With loUpdateObject
    .ApplicationName      = 'IntellisenseX'
    .ToolName             = 'Thor_Tool_ThorInternalRepository'
    .VersionFileURL       = 'http://vfpxrepository.com/dl/thorupdate/Tools/IntellisenseX/IntellisenseXVersionFile.txt'
    .VersionLocalFilename = VersionFileName
    .RegisterWithThor     = lcRegisterWithThor
    .Notes                = GetNotes()
    .Link                 = 'https://github.com/VFPX/IntelliSenseX'
    .LinkPrompt           = 'IntellisenseX Home Page'
Endwith

AddProperty(loUpdateObject, 'UpdateNowIfNotInstalled', 'Yes')    

Return loUpdateObject


Procedure GetNotes

    Local lcNotes
    Text to lcNotes NoShow

    EndText
    Return lcNotes
EndProc
