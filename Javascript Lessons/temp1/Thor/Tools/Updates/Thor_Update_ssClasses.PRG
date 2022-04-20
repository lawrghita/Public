lparameters loUpdateObject

With loUpdateObject
	* The name of the application (and also the folder it is stored in)
    .ApplicationName      = 'ssClasses'

    * Is this application a Component (if not, then a tool used in IDE)
    .Component            = 'Yes'

	* The URL of the version file that contains all the relevant info for this project
    .VersionFileURL       = 'http://vfpxrepository.com/dl/thorupdate/Projects/ssClasses/ssClassesVersionFile.txt'

	* The name of the text file containing the version currently installed.
    .VersionLocalFilename = 'ssClassesVersionFile.txt'
Endwith

Return loUpdateObject

