Lparameters loUpdateObject

Text to lcRegisterWithThor NoShow TextMerge
    
    Messagebox('From the Thor menu, see "More -> Open Folder -> Components"', 0 ,"Bin2Text installed", 5000)

EndText

lcRegisterWithThor = Strtran(lcRegisterWithThor, '@@@')

With loUpdateObject
    .ApplicationName      = 'Bin2Text'
    .Component            = 'Yes'
    .VersionLocalFilename = 'Bin2TextVersionFile.txt'
    .RegisterWithThor     = lcRegisterWithThor
    
    .VersionNumber        = 'v0.13.2'
    .VersionDate          = Date(2016,  1, 5)
    .ProjectCreationDate  = Date(2015, 12, 3)
    .SourceFileUrl        = 'http://vfpxrepository.com/dl/thorupdate/Components/Bin2Text.zip'
    .Link                 = 'https://github.com/lscheffler/bin2text'
    .LinkPrompt           = 'Bin2Text Home Page'
    .Notes                = GetNotes()
Endwith

Return loUpdateObject


Procedure GetNotes

    Local lcNotes
    Text to lcNotes NoShow
The main goals of this project are:
The main goal is to do fast git commits.
Visual FoxPro IDE integration that works with whole projects.

The problems this project tries to solve:
Better IDE integration of FoxBin2Prg
Faster processing of PJX and groups of corresponding PJXs
git commit integration
Processing of group of files that can not be addressed with FoxBin2PRG interface

    EndText
    Return lcNotes
EndProc
