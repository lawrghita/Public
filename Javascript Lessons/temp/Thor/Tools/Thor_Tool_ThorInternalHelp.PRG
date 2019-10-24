Lparameters lxParam1

****************************************************************
****************************************************************
* Standard prefix for all tools for Thor, allowing this tool to
*   tell Thor about itself.

If Pcount() = 1						  ;
		And 'O' = Vartype (lxParam1)  ;
		And 'thorinfo' = Lower (lxParam1.Class)

	With lxParam1
		.Prompt		 = 'Help for Thor'
		.Description = 'Follows link to Thor Home Page'
		.Source		 = 'Thor'
		.Version     = 'Thor - 1.42.13 - June 18, 2016'
		.Sort		 = 20
		.Link        = 'https://github.com/VFPX/Thor/blob/master/Docs/Thor_help.md'
	Endwith

	Return lxParam1
Endif

Do ToolCode

Return

****************************************************************
****************************************************************
* Normal processing for this tool begins here.
Procedure ToolCode
	lcFormFileName = Execscript (_Screen.cThorDispatcher, 'Full Path=Thor_Proc_ProjectHomePages.SCX')
	Do Form (lcFormFileName)
EndProc
