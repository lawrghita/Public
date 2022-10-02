Lparameters lxParam1

****************************************************************
****************************************************************
* Standard prefix for all tools for Thor, allowing this tool to
*   tell Thor about itself.

If Pcount() = 1						  ;
		And 'O' = Vartype (lxParam1)  ;
		And 'thorinfo' = Lower (lxParam1.Class)

	With lxParam1
		.Prompt		 = 'All Thor Repository Tools'
		.Description = 'Menu of all tools registered in the Thor Repository'
		.Source		 = 'Thor'
		.FolderName	 = 'D:\JAVASCRIPT\PUBLIC\JAVASCRIPT LESSONS\TEMP\Thor\Tools\'
		.Version     = 'Thor - 1.42.13 - June 18, 2016'
		.Sort		 = 40
	Endwith

	Return lxParam1
Endif

Do ToolCode

Return

****************************************************************
****************************************************************
* Normal processing for this tool begins here.
Procedure ToolCode
	Do 'D:\JAVASCRIPT\PUBLIC\JAVASCRIPT LESSONS\TEMP\Thor.APP' with 'Thor Repository'
EndProc
