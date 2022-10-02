Lparameters tnInterval, tlInstallAllUpdates

Local lcTableName

If Not Empty (tnInterval) And 'N' = VarType (tnInterval) And tnInterval > 0
	lcTableName = 'D:\JAVASCRIPT\PUBLIC\JAVASCRIPT LESSONS\TEMP\Thor\Tables\LastCheckForUpdatesDate.DBF'
	Select 0
	If File (lcTableName)
		Use (lcTableName)
	Else
		Create Table (lcTableName) Free (LastDate D)
	Endif

	If Reccount() = 0
		Append Blank
	Endif

	Goto Top
	If Date() >= LastDate + tnInterval
		Replace LastDate With Date()
		Use

		Do 'D:\JAVASCRIPT\PUBLIC\JAVASCRIPT LESSONS\TEMP\Thor.APP' With 'Run', .T. && installs Thor, but without startups

		Execscript (_Screen.cThorDispatcher, 'Thor_Tool_Thor_CheckForUpdates', tlInstallAllUpdates)
	Else
		Use
	Endif

Endif	

Do 'D:\JAVASCRIPT\PUBLIC\JAVASCRIPT LESSONS\TEMP\Thor.APP' With 'Run', .F. && normal installation of Thor (with startups)
