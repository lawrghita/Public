CLOSE ALL
CLEAR
MODIFY PROJECT "d:\javascript\public\javascript lessons\temp\myproj1.pjx" NOWAIT
MODIFY DATABASE mydata1 NOWAIT
DO 'c:\Program Files (x86)\Microsoft Visual FoxPro 9\Tools\Gendbc\gendbc.prg' WITH 'MyData1.prg'
MODIFY DATABASE mydata1 NOWAIT
MODIFY COMMAND MyData1 NOWAIT
MODIFY COMMAND prog1 NOWAIT



