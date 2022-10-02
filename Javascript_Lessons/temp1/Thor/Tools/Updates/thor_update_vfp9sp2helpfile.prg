Lparameters loUpdateObject

Text to lcRegisterWithThor NoShow TextMerge
    
    Run /N "##InstallFolder##dv_foxhelp_vfp9sp2_v1.07.EXE"

EndText

lcRegisterWithThor = Strtran(lcRegisterWithThor, '@@@')

With loUpdateObject
    .ApplicationName      = 'VFP9SP2HelpFile'
    .Component            = 'Yes'
    .VersionLocalFilename = 'VFP9SP2HelpFileVersionFile.txt'
    .RegisterWithThor     = lcRegisterWithThor
    
    .AvailableVersion     = 'VFP9SP2HelpFile - 1.07 - June 12, 2014 - 20140612'
    .SourceFileUrl        = 'http://vfpxrepository.com/dl/thorupdate/Components/VFP9SP2HelpFile.zip'
    .Link                 = 'https://github.com/VFPX/HelpFile'
    .LinkPrompt           = 'VFP9 SP2 Help File Home Page'
    .Notes                = GetNotes()
Endwith

Return loUpdateObject


Procedure GetNotes

    Local lcNotes
    Text to lcNotes NoShow
The Visual FoxPro 9 SP2 Help file corrected, supported, and enhanced.
Project Manager: Francis Faure

Ownership transfer of the VFP 9 SP2 Help file source code and rights to change from Microsoft to VFP Community 
via Creative Commons licensing.

What are the goals of this project?
1) Provide corrected VFP 9 SP2 Help file to the VFP Community. Corrections to the Help file include corrected 
index, corrected hyperlinks, and corrected stylesheet.

2) Allow the VFP Community to further enhance the Help file moving forward, adding missing content for VFP 9 SP2 
and Sedna, making necessary corrections to existing examples, and repairing additional things missing in the index (like the SYS() functions).

    EndText
    Return lcNotes
EndProc
