Lparameters loUpdateObject

With loUpdateObject
    .AppName          = 'GoFish5.APP'
    .ApplicationName  = 'GoFish5'
    .ToolName         = 'Thor_Tool_GoFish5'
    .SourceFileUrl        = 'http://vfpxrepository.com/dl/thorupdate/Components/GoFish5Prod.zip'
    .Component            = 'No'

    .VersionLocalFilename   = 'GoFishVersionFile.txt'
    .RegisterWithThor     = 'Do "##InstallFolder##GoFish5.APP" with "Thor", .T.'
    .Link               = 'https://github.com/mattslay/GoFish'
    
    .VersionNumber	  =    '5.0.163'
    .VersionDate          = Date(2017, 02, 12)

    .ProjectCreationDate  = Date(2016,  9, 11)
Endwith

Return loUpdateObject

