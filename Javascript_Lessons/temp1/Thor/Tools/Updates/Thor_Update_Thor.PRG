Lparameters loUpdateObject

With loUpdateObject
    .AppName              = 'Thor.App'
    .ApplicationName      = 'Thor'
    .ToolName             = 'Thor_Tool_ThorInternalEdit'
    .VersionFileURL       = 'http://vfpxrepository.com/dl/thorupdate/thor/_ThorVersionFile.txt'
    .VersionLocalFilename = 'Thor\ThorVersion.txt'
    .RegisterWithThor     = 'Do "##InstallFolder##Thor.APP" with "Install"'
    .SourceFileURL        = 'Thor_Source.Zip = http://vfpxrepository.com/dl/thorupdate/thor/Thor_Source.zip'
    .Link                 = 'https://github.com/VFPX/Thor'
    .LinkPrompt           = 'Thor Home Page'
Endwith

AddProperty(loUpdateObject, 'UnzipAfterDownload', 'Yes')    

Return loUpdateObject
