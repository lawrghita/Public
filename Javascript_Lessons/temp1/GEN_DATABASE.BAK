
DisplayStatus([Creating database...])
CLOSE ALL
SET SAFETY OFF

SET PATH TO HOME()
IF FILE('MYDATA1.DBC')
 DELETE FILE 'MYDATA1.DBC'
ENDIF

CREATE DATABASE 'MYDATA1.DBC'

DisplayStatus([Creating table VANZATOR...])
DeleteTable('VANZATOR')
MakeTable_VANZATOR()
Initialize_VANZATOR()

DisplayStatus([Creating table CUMPARATOR...])
DeleteTable('CUMPARATOR')
MakeTable_CUMPARATOR()
Initialize_CUMPARATOR()

DisplayStatus([Creating table COMENZI...])
DeleteTable('COMENZI')
MakeTable_COMENZI()
Initialize_COMENZI()

DisplayStatus([Creating persistent relations...])
MakeRelation_1()
MakeRelation_2()
DisplayStatus([Finished.])

MODIFY PROJECT "d:\javascript\public\javascript lessons\temp\myproj1.pjx" NOWAIT
MODIFY DATABASE mydata1 NOWAIT
MODIFY COMMAND prog1 NOWAIT
MODIFY COMMAND GEN_DATABASE.PRG NOWAIT

*********************
*********************


FUNCTION DeleteTable()
PARAMETERS sTable
***** Delete existing table *****
IF FILE(sTable+'.DBF')
 DELETE FILE sTable+'.DBF'
ENDIF
IF FILE(sTable+'.CDX')
 DELETE FILE sTable+'.CDX'
ENDIF
ENDFUNC


FUNCTION MakeTable_VANZATOR
***** Table setup for VANZATOR *****
CREATE TABLE 'VANZATOR.DBF' NAME 'VANZATOR' (;
						ID I PRIMARY KEY, ;
                       	NUME C(20) NOT NULL)

***** Create each index for VANZATOR *****
*ALTER TABLE 'VANZATOR' ADD PRIMARY KEY ID TAG ID 
*INDEX ON ID TAG ID CANDIDATE
***** Change properties for VANZATOR *****
ENDFUNC

FUNCTION Initialize_VANZATOR()
 APPEND BLANK
 REPLACE ID WITH 1, NUME WITH 'Ion'
 APPEND BLANK
 REPLACE ID WITH 2, NUME WITH 'Mihai'
ENDFUNC

FUNCTION MakeTable_CUMPARATOR
***** Table setup for CUMPARATOR *****
CREATE TABLE 'CUMPARATOR.DBF' NAME 'CUMPARATOR' (;
						 ID I PRIMARY KEY, ;
                         ID_VANZ I NOT NULL, ;
                         NUME C(10) NOT NULL, ;
                         RAMURA C(10) NOT NULL, ;
                         FOREIGN KEY ID_VANZ TAG ID_VANZ REFERENCES VANZATOR)

***** Create each index for CUMPARATOR *****
*ALTER TABLE 'CUMPARATOR' ADD PRIMARY KEY ID TAG ID  
*INDEX ON ID TAG ID CANDIDATE
INDEX ON NUME TAG NUME CANDIDATE
*INDEX ON ID_VANZ TAG ID_VANZ  

***** Change properties for CUMPARATOR *****
ENDFUNC

FUNCTION Initialize_CUMPARATOR()
 APPEND BLANK
 REPLACE ID WITH 1, NUME WITH 'Maria', ID_VANZ WITH 2, RAMURA WITH "APE"
 APPEND BLANK
 REPLACE ID WITH 2, NUME WITH 'Laura', ID_VANZ WITH 1, RAMURA WITH "ICE"
ENDFUNC


FUNCTION MakeTable_COMENZI
***** Table setup for COMENZI *****
CREATE TABLE 'COMENZI.DBF' NAME 'COMENZI' (;
					ID I PRIMARY KEY, ;
                    ID_CUMP I NOT NULL, ;
                    VALOARE Y NOT NULL ;
                              DEFAULT 0.0001, ;
                    CANTITATE I DEFAULT 10 ;
                                CHECK (CANTITATE > 9);
                                ERROR "Cantitate trebuie mai mare sau egala cu 10", ;
                    DISCOUNT N(5,2) NULL DEFAULT NULL,; 
                    CHECK (VALOARE > 0) ERROR "Valoarea mai mare ca 0" ;
                    )
***** Create each index for COMENZI *****
INDEX ON ID_CUMP TAG ID_CUMP  
*ALTER TABLE 'COMENZI' ADD PRIMARY KEY ID TAG ID  
***** Change properties for COMENZI *****
DBSETPROP('COMENZI.ID', 'Field', 'Caption', "Identificator Comanda")
DBSETPROP('COMENZI.ID_CUMP', 'Field', 'Caption', "Cod Cumparator")
DBSETPROP('COMENZI.VALOARE', 'Field', 'Caption', "Suma LEI")
DBSETPROP('COMENZI.VALOARE', 'Field', 'InputMask', "999999.9999")
DBSETPROP('COMENZI.VALOARE', 'Field', 'Format', "$")
ENDFUNC

FUNCTION Initialize_COMENZI()
INSERT INTO COMENZI (ID, ID_CUMP, VALOARE, CANTITATE, DISCOUNT) VALUES ;
					( 3,	    1, 2.0000, 		  10,     NULL)
INSERT INTO COMENZI (ID, ID_CUMP, VALOARE, CANTITATE, DISCOUNT) VALUES ;
					( 1,	    1, 5.5000, 		  11,      1.6)
INSERT INTO COMENZI (ID, ID_CUMP, VALOARE, CANTITATE, DISCOUNT) VALUES ;
					( 2,	    2, 3.500, 		  15,     NULL)
ENDFUNC



*************** Begin Relations Setup **************
FUNCTION MakeRelation_1
ALTER TABLE 'CUMPARATOR' ADD FOREIGN KEY TAG ID_VANZ REFERENCES VANZATOR TAG ID
SELECT CUMPARATOR
SET ORDER TO ID
SET RELATION TO ID_VANZ INTO VANZATOR
ENDFUNC

FUNCTION MakeRelation_2
ALTER TABLE 'COMENZI' ADD FOREIGN KEY TAG ID_CUMP REFERENCES CUMPARATOR TAG ID
SELECT COMENZI
SET ORDER TO ID
SET RELATION TO ID_CUMP INTO CUMPARATOR
ENDFUNC
*********************
FUNCTION DisplayStatus(lcMessage)
WAIT WINDOW  NOWAIT lcMessage
ENDFUNC
****
