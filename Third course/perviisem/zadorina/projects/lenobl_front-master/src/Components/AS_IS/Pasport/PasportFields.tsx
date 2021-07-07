import React from "react";
import Iframe from "react-iframe";
import {
    Popover,
    OverlayTrigger,
    Tooltip,
    Overlay,
    Button,
    Row,
    Col,
    Dropdown,
    FormControl,
    Form,
    DropdownButton,
    Table,
    Glyphicon,
    Tabs,
    Tab,
    FormGroup
} from "react-bootstrap";
import FileComponentEdit from "../../FileComponent";
import { send } from "process";
import FileDeleteButton from "../../GeneralFileTable/FileDeleteButton";
import manageState from "react-select/src/stateManager";
import getServiceUrl from "../../../utils/serviceUrl";
import { useDispatch, useSelector } from "react-redux";
import { getProjectPasport } from "../../../Actions/rest";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        style={{
            paddingRight: "10px",
            borderBottom: "1px solid black",
            color: "#767676",
            whiteSpace: "normal",
            fontFamily: " Exo 2",
            fontStyle: "italic",
            fontWeight: "normal",
            fontSize: "14px",
            lineHeight: "17px"
        }}
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
    </a>
));

const CustomMenu = React.forwardRef(({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = React.useState("");
    return (
        <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
            <FormControl
                autoFocus
                className="my-2 w-auto"
                placeholder="Начните печатать для фильтрации"
                onChange={(e) => setValue(e.target.value)}
                value={value}
                style={{ minWidth: "320px", width: "100%", margin: "0px", whiteSpace: "normal" }}
            />
            <ul className="list-unstyled" style={{ whiteSpace: "normal" }}>
                {React.Children.toArray(children).filter(
                    (child) => !value || child.props.children[1].toLowerCase().startsWith(value)
                )}
            </ul>
        </div>
    );
});

function PasportFields(props) {
    const data = useSelector(({ grapth }) => ({
        procInfoSysCommand: grapth?.projPasport?.procInfoSysCommand
    }));

    const dispatch = useDispatch();

    const [page, setPage] = React.useState("Визуализация");

    // const [allInfosystem, setAllInfosystem] = React.useState(props.allInfosystem);
    const [infoSystemDisc, setInfoSystemDisc] = React.useState();
    const [allInfosystemList, setAllInfosystemList] = React.useState([]);
    const [allInfosystemListShow, setAllInfosystemListShow] = React.useState([]);
    const [allInfosystemDrop, setAllinfosystemDrop] = React.useState([]);
    const [SelectedInfSyst, setSelectedInfSyst] = React.useState([]);
    const [typeInfoSys, setTypeInfoSys] = React.useState();

    const [DeclarantTypeDrop, setDeclarantTypeDrop] = React.useState([]);
    const [DayTypeDrop1, setDayTypeDrop1] = React.useState([]);
    const [DayTypeDrop2, setDayTypeDrop2] = React.useState([]);
    const [AllTaxTypeDrop, setAllTaxTypeDrop] = React.useState([]);
    const [AllDigitalTypeDrop, setAllDigitalTypeDrop] = React.useState([]);
    const [AllInstitutionDrop, setAllInstitutionDrop] = React.useState([]);

    const [selectedDeclarantType, setSelectedDeclarantType] = React.useState([]);
    const [selectedDayType1, setselectedDayType1] = React.useState({});
    const [selectedDayType2, setselectedDayType2] = React.useState({});
    const [selectedAllTaxTypee, setselectedAllTaxTypee] = React.useState([]);
    const [selectedAllInstitution, setselectedAllInstitution] = React.useState([]);
    const [selectedBadPlays, setSelectedBadPlays] = React.useState();

    const [selectedDeclarantTypeTable, setSelectedDeclarantTypeTable] = React.useState([]);
    const [selectedAllTaxTypeeTable, setselectedAllTaxTypeeTable] = React.useState([]);
    const [selectedAllInstitutionTable, setSelectedAllInstitutionTable] = React.useState([]);
    const [selectedBadPlaysTable, setSelectedBadPlaysTable] = React.useState([]);

    const [selectedDeclarantTypeTableShow, setSelectedDeclarantTypeTableShow] = React.useState([]);
    const [selectedAllTaxTypeeTableShow, setselectedAllTaxTypeeTableShow] = React.useState([]);
    const [selectedAllInstitutionTableShow, setSelectedAllInstitutionTableShow] = React.useState([]);
    const [selectedBadPlaysTableShow, setSelectedBadPlaysTableShow] = React.useState([]);

    const [declarantName, setDeclarantName] = React.useState();
    const [taxName, setTaxName] = React.useState();
    const [taxValue, setTaxValue] = React.useState();
    const [institutionName, setInstitutionName] = React.useState();

    const [infSist, setInfSist] = React.useState("");
    const [optimisationReason, setOptimisationReason] = React.useState("");
    const [optimisationResult, setOptimisationResult] = React.useState("");
    const [comment, setComment] = React.useState("");
    const [selectedDayType1Value, setSelectedDayType1Value] = React.useState("");
    const [selectedDayType2Value, setSelectedDayType2Value] = React.useState("");
    const [refEPGU, setRefEPGU] = React.useState("");
    const [refRPGU, setRefRPGU] = React.useState("");

    const [showKategory, setShowKategory] = React.useState(false);
    const [showSbor, setShowSbor] = React.useState(false);
    const [showUch, setShowUch] = React.useState(false);
    const [showBadplays, setShowBadplays] = React.useState(false);
    const [ShowInfSyst, setShowInfSyst] = React.useState(false);

    const [check1, setCheck1] = React.useState("");
    const [check2, setCheck2] = React.useState("");
    const [check3, setCheck3] = React.useState("");
    const [check4, setCheck4] = React.useState("");
    const [check5, setCheck5] = React.useState("");
    const [check6, setCheck6] = React.useState("");

    const [ischeck1, setisCheck1] = React.useState(false);
    const [ischeck2, setisCheck2] = React.useState(false);
    const [ischeck3, setisCheck3] = React.useState(false);
    const [ischeck4, setisCheck4] = React.useState(false);
    const [ischeck5, setisCheck5] = React.useState(false);
    const [ischeck6, setisCheck6] = React.useState(false);

    const [ProcDocName, setProcDocName] = React.useState("");
    const [ProcDocRequired, setProcDocRequired] = React.useState();
    const [ProcDocComment, setProcDocComment] = React.useState("");
    const [ProcDocNote, setProcDocNote] = React.useState("");

    const [ApplicationKit, setApplicationKit] = React.useState([]);
    const [showApplicationKit, setshowApplicationKit] = React.useState([]);

    const [fileTable, setFileTable] = React.useState([]);

    const kategory = React.useRef(null);
    const sbor = React.useRef(null);
    const infSyst = React.useRef(null);
    const uch = React.useRef(null);
    const badplays = React.useRef(null);

    // React.useMemo(() => {
    //     setshowAllInfosystem(mas)
    // })

    React.useMemo(() => {
        // setAllInfosystem(props.allInfosystem);
        let mas = [];
        for (let i = 0; i < props.allInfosystem?.length; i++) {
            mas.push(
                <Dropdown.Item
                    onClick={() => {
                        setSelectedInfSyst(props.allInfosystem[i]);
                    }}
                    key={i}
                >
                    {props.allInfosystem[i].name}
                </Dropdown.Item>
            );
        }
        setAllinfosystemDrop(mas);
    }, [props.allInfosystem]);

    React.useMemo(() => {
        if (props.projPasport?.digitalTrans != undefined) {
            setCheck1(props?.projPasport?.digitalTrans[0]?.disc);
            setCheck2(props?.projPasport?.digitalTrans[1]?.disc);
            setCheck3(props?.projPasport?.digitalTrans[2]?.disc);
            setCheck4(props?.projPasport?.digitalTrans[3]?.disc);
            setCheck5(props?.projPasport?.digitalTrans[4]?.disc);
            setCheck6(props?.projPasport?.electronicDocumentFlowMFC?.disc);
            setisCheck1(props?.projPasport?.digitalTrans[0]?.flag || false);
            setisCheck2(props?.projPasport?.digitalTrans[1]?.flag || false);
            setisCheck3(props?.projPasport?.digitalTrans[2]?.flag || false);
            setisCheck4(props?.projPasport?.digitalTrans[3]?.flag || false);
            setisCheck5(props?.projPasport?.digitalTrans[4]?.flag || false);
            setisCheck6(props?.projPasport?.electronicDocumentFlowMFC?.flag || false);
        }
    }, [props.projPasport]);

    React.useMemo(() => {
        if (props.projPasport) setRefRPGU(props.projPasport.refRPGU);
    }, [props.projPasport]);

    React.useMemo(() => {
        if (props.projPasport) setRefEPGU(props.projPasport.refEPGU);
    }, [props.projPasport]);

    React.useMemo(() => {
        if (props.projPasport) setOptimisationResult(props.projPasport.optimisationResult);
    }, [props.projPasport]);

    React.useMemo(() => {
        if (props.projPasport) setOptimisationReason(props.projPasport.optimisationReason);
    }, [props.projPasport]);

    React.useMemo(() => {
        if (props.projPasport) setComment(props.projPasport.other);
    }, [props.projPasport]);

    React.useMemo(() => {
        if (props.projPasport) setInfSist(props.projPasport.infSist);
    }, [props.projPasport]);

    React.useMemo(() => {
        if (props.fileNPATable != undefined) {
            let mas = [];
            for (let i = 0; i < props.fileNPATable.length; i++) {
                mas.push(
                    <tr>
                        <td>{props.fileNPATable[i].nameNPA}</td>
                        <td>{props.fileNPATable[i].numberNPA}</td>
                        <td>{props.fileNPATable[i].dateNPA}</td>
                        <td>
                            <Button
                                size="sm"
                                onClick={() => {
                                    props.saveFile(
                                        props.fileNPATable[i].refProjectFile.id,
                                        props.fileNPATable[i].refProjTask.project.id,
                                        props.fileNPATable[i].fileName
                                    );
                                }}
                            >
                                скачать
                            </Button>
                            <FileDeleteButton infotype={[]} task={4} data={props.fileNPATable[i]}></FileDeleteButton>
                        </td>
                    </tr>
                );
            }
            setFileTable(mas);
        }
    }, [props.fileNPATable]);

    React.useMemo(() => {
        if (props.pasportParams?.declarantType) {
            let mas = [];
            for (let i = 0; i < props.pasportParams?.declarantType.length; i++) {
                mas.push(
                    <Dropdown.Item
                        onClick={() => {
                            setSelectedDeclarantType(props.pasportParams?.declarantType[i]);
                        }}
                        key={i}
                    >
                        {" "}
                        {props.pasportParams?.declarantType[i].name}{" "}
                    </Dropdown.Item>
                );
            }
            setDeclarantTypeDrop(mas);
        }
    }, [props.pasportParams?.declarantType]);

    React.useMemo(() => {
        if (props.pasportParams?.alldayType) {
            let mas = [];
            for (let i = 0; i < props.pasportParams?.alldayType.length; i++) {
                mas.push(
                    <Dropdown.Item
                        onClick={() => {
                            setselectedDayType1(props.pasportParams?.alldayType[i]);
                        }}
                        key={i}
                    >
                        {" "}
                        {props.pasportParams?.alldayType[i].name}{" "}
                    </Dropdown.Item>
                );
            }
            setDayTypeDrop1(mas);
            mas = [];
            for (let i = 0; i < props.pasportParams?.alldayType.length; i++) {
                mas.push(
                    <Dropdown.Item
                        onClick={() => {
                            setselectedDayType2(props.pasportParams?.alldayType[i]);
                        }}
                        key={i}
                    >
                        {" "}
                        {props.pasportParams?.alldayType[i].name}{" "}
                    </Dropdown.Item>
                );
            }
            setDayTypeDrop2(mas);
        }
    }, [props.pasportParams?.alldayType]);

    React.useMemo(() => {
        if (props.pasportParams?.allTaxType) {
            let mas = [];
            for (let i = 0; i < props.pasportParams?.allTaxType.length; i++) {
                mas.push(
                    <Dropdown.Item
                        onClick={() => {
                            setselectedAllTaxTypee(props.pasportParams?.allTaxType[i]);
                        }}
                        key={i}
                    >
                        {" "}
                        {props.pasportParams?.allTaxType[i].name}{" "}
                    </Dropdown.Item>
                );
            }
            setAllTaxTypeDrop(mas);
        }
    }, [props.pasportParams?.allTaxType]);

    React.useMemo(() => {
        if (props.pasportParams?.allDigitalType) {
            let mas = [];
            for (let i = 0; i < props.pasportParams?.allDigitalType.length; i++) {
                mas.push(
                    <Dropdown.Item
                        onClick={() => {
                            setselectedAllDigitalType(props.pasportParams?.allDigitalType[i]);
                        }}
                        key={i}
                    >
                        {" "}
                        {props.pasportParams?.allDigitalType[i].name}{" "}
                    </Dropdown.Item>
                );
            }
            setAllDigitalTypeDrop(mas);
        }
    }, [props.pasportParams?.allDigitalType]);

    React.useMemo(() => {
        if (props.pasportParams?.allInstitution) {
            let mas = [];
            for (let i = 0; i < props.pasportParams?.allInstitution.length; i++) {
                mas.push(
                    <Dropdown.Item
                        onClick={() => {
                            setselectedAllInstitution(props.pasportParams?.allInstitution[i]);
                        }}
                        key={i}
                    >
                        {" "}
                        {props.pasportParams?.allInstitution[i].name}{" "}
                    </Dropdown.Item>
                );
            }
            setAllInstitutionDrop(mas);
        }
    }, [props.pasportParams?.allInstitution]);

    React.useMemo(() => {
        if (props.projPasport != undefined && props.projPasport != null && props.projPasport.declarant != undefined) {
            for (let i = 0; i < props.projPasport.declarant.length; i++) {
                setSelectedDeclarantTypeTableHelper(
                    props.projPasport.declarant[i].type,
                    props.projPasport.declarant[i].disc
                );
            }
        }
    }, [props.projPasport]);

    React.useMemo(() => {
        if (props.projPasport != undefined && props.projPasport != null && props.projPasport.institution != undefined) {
            for (let i = 0; i < props.projPasport.institution.length; i++) {
                selectedAllInstitutionTableHelper(
                    props.projPasport.institution[i].type,
                    props.projPasport.institution[i].disc
                );
            }
        }
    }, [props.projPasport]);

    React.useMemo(() => {
        if (props.projPasport != undefined && props.projPasport != null && props.projPasport.tax != undefined) {
            for (let i = 0; i < props.projPasport.tax.length; i++) {
                selectedAllTaxTypeeTableHelper(
                    props.projPasport.tax[i].type,
                    props.projPasport.tax[i].disc,
                    props.projPasport.tax[i].value
                );
            }
        }
    }, [props.projPasport]);

    React.useMemo(() => {
        if (props.projPasport != undefined && props.projPasport != null && props.projPasport.badPlaces != undefined) {
            for (let i = 0; i < props.projPasport.badPlaces.length; i++) {
                // console.log(props.projPasport.badPlaces[i].value)
                selectedBadPlaysTableHelper(props.projPasport.badPlaces[i].value);
            }
        }
    }, [props.projPasport]);

    React.useMemo(() => {
        if (
            props.projPasport != undefined &&
            props.projPasport.factDay != undefined &&
            props.projPasport.factDay.dayType != undefined
        ) {
            setselectedDayType1(props.projPasport.factDay.dayType);
        }
    }, [props.projPasport]);

    React.useMemo(() => {
        if (
            props.projPasport != undefined &&
            props.projPasport.normativeDay != undefined &&
            props.projPasport.normativeDay.dayType != undefined
        ) {
            setselectedDayType2(props.projPasport.normativeDay.dayType);
        }
    }, [props.projPasport]);

    React.useMemo(() => {
        console.log("BB", props.projPasport);
        let mas = [];
        for (let i = 0; i < props.projPasport?.procDocCommand?.length; i++) {
            mas.push(
                <tr key={i}>
                    <td>{props.projPasport?.procDocCommand[i]?.name}</td>
                    <td>{props.projPasport?.procDocCommand[i]?.required ? "Обязательно" : "Не обязательно"}</td>
                    <td>{props.projPasport?.procDocCommand[i]?.detail}</td>
                    <td>{props.projPasport?.procDocCommand[i]?.note}</td>
                </tr>
            );
        }
        setshowApplicationKit(mas);
        setApplicationKit(props.projPasport?.procDocCommand);
    }, [props.projPasport?.procDocCommand]);

    React.useEffect(() => {
        let mas1 = [];
        setAllInfosystemList(data?.procInfoSysCommand);
        setAllInfosystemList(data?.procInfoSysCommand);
        for (let i = 0; i < data?.procInfoSysCommand?.length; i++) {
            mas1.push(
                <tr key={mas1.length + 1}>
                    <td>{data?.procInfoSysCommand[i].detail}</td>
                    <td>{data?.procInfoSysCommand[i].infoSystemCommand.name}</td>
                    <td>
                        <Button
                            onClick={() => {
                                deleteInfoSystemElemet(i);
                            }}
                        >
                            Удалить
                        </Button>
                        <Button
                            onClick={() => {
                                setShowInfSyst(true);
                                setSelectedInfSyst(data?.procInfoSysCommand[i].infoSystemCommand);
                                setInfoSystemDisc(data?.procInfoSysCommand[i].detail);
                                setTypeInfoSys({ type: "Edit", id: i });
                            }}
                        >
                            Редактировать
                        </Button>
                    </td>
                </tr>
            );
        }

        // console.log(">>SHOW", mas1);
        // console.log(">>NOT SHOW", data?.procInfoSysCommand);
        setAllInfosystemListShow(mas1);
        // console.log(">>allInfosystemList", allInfosystemList);
        // console.log(">>allInfosystemListShow", allInfosystemListShow);
    }, [data.procInfoSysCommand]);

    function deleteInfoSystemElemet(i: number) {
        let mas = allInfosystemList;
        let mas1 = allInfosystemListShow;
        // console.log(">>MAS", mas1);
        mas?.splice(i, 1);
        mas1?.splice(i, 1);
        setAllInfosystemListShow(mas1);
        setAllInfosystemList(mas);
    }

    function setSelectedDeclarantTypeTableHelper(type, disc) {
        if (type != null && disc != "") {
            let isAllreadyPick = false;
            let mas = selectedDeclarantTypeTable;
            let mas1 = selectedDeclarantTypeTableShow;
            for (let i = 0; i < mas.length; i++) {
                if (mas[i].type.orderNumber == type.orderNumber) {
                    isAllreadyPick = true;
                }
            }
            if (!isAllreadyPick) {
                mas.push({ type: type, disc: disc });
                mas1.push(
                    <tr key={mas.length}>
                        <td>{type.name}</td>
                        <td>{disc}</td>
                    </tr>
                );
                setSelectedDeclarantTypeTable(mas);
                setSelectedDeclarantTypeTableShow(mas1);
            }
        }
    }

    function selectedAllTaxTypeeTableHelper(type, disc, value) {
        if (type != null && disc != "" && value != null) {
            let isAllreadyPick = false;
            let mas = selectedAllTaxTypeeTable;
            let mas1 = selectedAllTaxTypeeTableShow;
            for (let i = 0; i < mas.length; i++) {
                if (mas[i].type.orderNumber == type.orderNumber) {
                    isAllreadyPick = true;
                }
            }
            if (!isAllreadyPick) {
                mas.push({ type: type, disc: disc, value: value });
                mas1.push(
                    <tr key={mas.length}>
                        <td>{type.name}</td>
                        <td>{disc}</td>
                        <td>{value}</td>
                    </tr>
                );
                setselectedAllTaxTypeeTable(mas);
                setselectedAllTaxTypeeTableShow(mas1);
            }
        }
    }

    function selectedAllInstitutionTableHelper(type, disc) {
        if (type != null && disc != "") {
            let isAllreadyPick = false;
            let mas = selectedAllInstitutionTable;
            let mas1 = selectedAllInstitutionTableShow;
            for (let i = 0; i < mas.length; i++) {
                if (mas[i].type.orderNumber == type.orderNumber) {
                    isAllreadyPick = true;
                }
            }
            if (!isAllreadyPick) {
                mas.push({ type: type, disc: disc });
                mas1.push(
                    <tr key={mas.length}>
                        <td>{type.name}</td>
                        <td>{disc}</td>
                    </tr>
                );
                setSelectedAllInstitutionTable(mas);
                setSelectedAllInstitutionTableShow(mas1);
            }
        }
    }

    function selectedBadPlaysTableHelper(value) {
        if (value != "") {
            let isAllreadyPick = false;
            let mas = selectedBadPlaysTable;
            let mas1 = selectedBadPlaysTableShow;
            for (let i = 0; i < mas.length; i++) {
                if (mas[i].value == value) {
                    isAllreadyPick = true;
                }
            }
            if (!isAllreadyPick) {
                mas.push({ value: value });
                mas1.push(
                    <tr key={mas.length}>
                        <td>{value}</td>
                    </tr>
                );
                // console.log(mas1)
                setSelectedBadPlaysTable(mas);
                setSelectedBadPlaysTableShow(mas1);
            }
            // console.log(mas1)
        }
    }

    function AddApplicationKit(...params) {
        let mas = ApplicationKit;
        let mas1 = [];
        mas.push({
            name: params[0],
            required: params[1],
            detail: params[2],
            note: params[3]
        });
        setApplicationKit(mas);
        for (let i = 0; i < mas.length; i++) {
            mas1.push(
                <tr key={i}>
                    <td>{mas[i].name}</td>
                    <td>{mas[i].required ? "Обязательно" : "Не обязательно"}</td>
                    <td>{mas[i].detail}</td>
                    <td>{mas[i].note}</td>
                </tr>
            );
        }
        console.log(mas1);
        setshowApplicationKit(mas1);
        console.log(">>ApplicationKit", ApplicationKit);
    }

    function AddInfoSystem(...params) {
        let mas = allInfosystemList;
        let mas1 = allInfosystemListShow;
        mas.push({ detail: params[0], infoSystemCommand: params[1] });
        mas1.push(
            <tr key={mas1.length + 1}>
                <td>{params[0]}</td>
                <td>{params[1].name}</td>
                <td>
                    <Button
                        onClick={() => {
                            deleteInfoSystemElemet(mas1.length + 1);
                        }}
                    >
                        Удалить
                    </Button>
                    <Button>Редактировать</Button>
                </td>
            </tr>
        );
        console.log(">>SHOW", mas1);
        setAllInfosystemListShow(mas1);
        setAllInfosystemList(mas);
    }

    function EditInfoStstem(...params) {
        let mas = allInfosystemList;
        let mas1 = allInfosystemListShow;
        console.log(">>params", params);
        mas[params[2]].infoSystemCommand.id = params[1].id;
        mas[params[2]].infoSystemCommand.name = params[1].name;
        mas[params[2]].infoSystemCommand.orderNumber = params[1].orderNumber;
        mas[params[2]].infoSystemCommand.reestrLink = params[1].reestrLink;
        mas[params[2]].infoSystemCommand.reestrNumber = params[1].reestrNumber;
        mas[params[2]].detail = params[0];
        mas[params[2]].id = params[3];

        mas1[params[2]] = (
            <tr key={mas1.length + 1}>
                <td>{params[0]}</td>
                <td>{params[1].name}</td>
                <td>
                    <Button
                        onClick={() => {
                            deleteInfoSystemElemet(params[2]);
                        }}
                    >
                        Удалить
                    </Button>
                    <Button>Редактировать</Button>
                </td>
            </tr>
        );

        setAllInfosystemList(mas);
        setAllInfosystemListShow(mas1);
        console.log(">>EditMas", mas);
        console.log(">>EditMasShow", mas1);
    }

    return (
        <>
            <div>
                <b>Паспорт процесса</b>
            </div>
            <div> Подготовить паспорт процесса </div>
            <br />
            <Button
                variant="outline-primary"
                onClick={() => {
                    setPage("Визуализация");
                }}
            >
                {" "}
                Визуализация{" "}
            </Button>
            <Button
                variant="outline-primary"
                onClick={() => {
                    setPage("Изменить данные");
                    dispatch(getProjectPasport(props.projId));
                }}
            >
                {" "}
                Изменить данные{" "}
            </Button>
            <br />
            {page === "Изменить данные" ? (
                <>
                    <br />
                    <Row>
                        <Button
                            onClick={() => {
                                if (
                                    (ischeck1 === true && (check1 == "" || check1 == undefined || check1 == null)) ||
                                    (ischeck2 === true && (check2 == "" || check2 == undefined || check2 == null)) ||
                                    (ischeck3 === true && (check3 == "" || check3 == undefined || check3 == null)) ||
                                    (ischeck4 === true && (check4 == "" || check4 == undefined || check4 == null)) ||
                                    (ischeck5 === true && (check5 == "" || check5 == undefined || check5 == null)) ||
                                    (ischeck6 === true && (check6 == "" || check6 == undefined || check6 == null))
                                ) {
                                    alert(
                                        'В поле "Наличие признаков цифровой трансформации на текущий момент" не указано описание источников подтверждающих наличие признака'
                                    );
                                } else {
                                    if (
                                        refEPGU != undefined &&
                                        refEPGU != null &&
                                        !refEPGU?.includes("http://") &&
                                        !refEPGU?.includes("https://")
                                    ) {
                                        alert(
                                            "В поле 'Ссылка на ЕПГУ' указана не корректная ссылка. Укажите полный путь до сайта"
                                        );
                                    } else {
                                        if (
                                            refRPGU != undefined &&
                                            refRPGU != null &&
                                            !refRPGU?.includes("http://") &&
                                            !refRPGU?.includes("https://")
                                        ) {
                                            alert(
                                                "В поле 'Ссылка на РПГУ' указана не корректная ссылка. Укажите полный путь до сайта"
                                            );
                                        } else {
                                            props.savePasportFields(
                                                props.projId,
                                                selectedDeclarantTypeTable,
                                                selectedAllTaxTypeeTable,
                                                selectedAllInstitutionTable,
                                                infSist,
                                                optimisationReason,
                                                optimisationResult,
                                                comment,
                                                selectedBadPlaysTable,
                                                selectedDayType1Value,
                                                selectedDayType1,
                                                selectedDayType2Value,
                                                selectedDayType2,
                                                refEPGU,
                                                refRPGU,
                                                check1,
                                                check2,
                                                check3,
                                                check4,
                                                check5,
                                                check6,
                                                ischeck1,
                                                ischeck2,
                                                ischeck3,
                                                ischeck4,
                                                ischeck5,
                                                ischeck6,
                                                ApplicationKit,
                                                allInfosystemList
                                            );
                                        }
                                    }
                                }
                            }}
                        >
                            Сохранить
                        </Button>
                    </Row>
                    <Row>
                        {props.processType == 2 ? "Заявитель (инициатор)" : "Заявители"}
                        <Button
                            variant="outline-primary"
                            style={{ width: "100%" }}
                            ref={kategory}
                            onClick={() => setShowKategory(!showKategory)}
                        >
                            Укажите заявителей
                        </Button>
                        <Overlay target={kategory.current} show={showKategory} placement="bottom">
                            {({ placement, arrowProps, show: _show, popper, ...props }) => (
                                <div
                                    {...props}
                                    style={{
                                        border: "2px solid black",
                                        backgroundColor: "white",
                                        padding: "2px 10px",
                                        borderRadius: 3,
                                        width: "65%",
                                        ...props.style
                                    }}
                                >
                                    <Row>
                                        <Col xs={4}>Категория заявителя</Col>
                                        <Col xs={8}>
                                            <Dropdown style={{ whiteSpace: "normal" }}>
                                                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                                    {selectedDeclarantType.length != 0
                                                        ? selectedDeclarantType.name
                                                        : "Выберите категорию заявителя"}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu as={CustomMenu}>{DeclarantTypeDrop}</Dropdown.Menu>
                                            </Dropdown>
                                            {/* {selectedDeclarantTypeTable} */}
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col xs={4}>Детальное описание</Col>
                                        <Col xs={8}>
                                            <textarea
                                                onChange={(e) => {
                                                    setDeclarantName(e.target.value);
                                                }}
                                                style={{ width: "100%" }}
                                            ></textarea>
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col xs={9}></Col>
                                        <Col>
                                            <Button
                                                onClick={() => {
                                                    setShowKategory(false);
                                                    setSelectedDeclarantTypeTableHelper(
                                                        selectedDeclarantType,
                                                        declarantName
                                                    );
                                                }}
                                            >
                                                Добавить
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button
                                                onClick={() => {
                                                    setShowKategory(false);
                                                    setSelectedDeclarantType([]);
                                                    setDeclarantName("");
                                                }}
                                            >
                                                Отменить
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            )}
                        </Overlay>
                    </Row>
                    <Table>
                        <tbody>{selectedDeclarantTypeTableShow}</tbody>
                    </Table>
                    <br />
                    <Row>
                        Участники процесса
                        <Button
                            variant="outline-primary"
                            style={{ width: "100%" }}
                            ref={uch}
                            onClick={() => setShowUch(!showUch)}
                        >
                            Укажите участников
                        </Button>
                        <Overlay target={uch.current} show={showUch} placement="bottom">
                            {({ placement, arrowProps, show: _show, popper, ...props }) => (
                                <div
                                    {...props}
                                    style={{
                                        border: "2px solid black",
                                        backgroundColor: "white",
                                        padding: "2px 10px",
                                        borderRadius: 3,
                                        width: "65%",
                                        ...props.style
                                    }}
                                >
                                    <Row>
                                        <Col xs={4}>Выберите участника процесса</Col>
                                        <Col xs={8}>
                                            <Dropdown style={{ whiteSpace: "normal" }}>
                                                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                                    {selectedAllInstitution.length != 0
                                                        ? selectedAllInstitution.name
                                                        : "Выберите организацию"}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu as={CustomMenu}>
                                                    {/* {workList} */}
                                                    {AllInstitutionDrop}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            {/* {selectedAllInstitution[0].name} */}
                                            {/* {selectedWorkList} */}
                                            {/* {selectedAllInstitutionTable} */}
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col xs={4}>Детальное описание</Col>
                                        <Col xs={8}>
                                            <textarea
                                                onChange={(e) => {
                                                    setInstitutionName(e.target.value);
                                                }}
                                                style={{ width: "100%" }}
                                            ></textarea>
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col xs={9}></Col>
                                        <Col>
                                            <Button
                                                onClick={() => {
                                                    setShowUch(false);
                                                    selectedAllInstitutionTableHelper(
                                                        selectedAllInstitution,
                                                        institutionName
                                                    );
                                                }}
                                            >
                                                Добавить
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button
                                                onClick={() => {
                                                    setShowUch(false);
                                                    setInstitutionName("");
                                                    setselectedAllInstitution([]);
                                                }}
                                            >
                                                Отменить
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            )}
                        </Overlay>
                    </Row>
                    <Table>
                        <tbody>{selectedAllInstitutionTableShow}</tbody>
                    </Table>
                    <br />
                    <Row>
                        Информационные системы
                        <Button
                            variant="outline-primary"
                            style={{ width: "100%" }}
                            ref={infSyst}
                            onClick={() => {
                                setShowInfSyst(!ShowInfSyst);
                                setTypeInfoSys({ type: "Add", id: -1 });
                            }}
                        >
                            Укажите информационные системы, используемые на текущий момент
                        </Button>
                        <Overlay target={infSyst.current} show={ShowInfSyst} placement="bottom">
                            {({ placement, arrowProps, show: _show, popper, ...props }) => (
                                <div
                                    {...props}
                                    style={{
                                        border: "2px solid black",
                                        backgroundColor: "white",
                                        padding: "2px 10px",
                                        borderRadius: 3,
                                        width: "65%",
                                        ...props.style
                                    }}
                                >
                                    <Row>
                                        <Col xs={4}>Информационная система</Col>
                                        <Col xs={8}>
                                            <Dropdown style={{ whiteSpace: "normal" }}>
                                                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                                    {SelectedInfSyst.name || "Выберите информационную систему"}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu as={CustomMenu}>{allInfosystemDrop}</Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col xs={4}>Детальное описание</Col>
                                        <Col xs={8}>
                                            <textarea
                                                defaultValue={infoSystemDisc || ""}
                                                onChange={(e) => {
                                                    setInfoSystemDisc(e.target.value);
                                                }}
                                                style={{ width: "100%" }}
                                            ></textarea>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button
                                                onClick={() => {
                                                    setShowInfSyst(false);
                                                    if (typeInfoSys?.type == "Edit") {
                                                        EditInfoStstem(
                                                            infoSystemDisc,
                                                            SelectedInfSyst,
                                                            typeInfoSys?.id,
                                                            allInfosystemList[typeInfoSys?.id].id
                                                        );
                                                    }
                                                    if (typeInfoSys?.type == "Add") {
                                                        AddInfoSystem(infoSystemDisc, SelectedInfSyst);
                                                    }
                                                }}
                                            >
                                                {typeInfoSys?.type == "Add" ? "Добавить" : "Сохранить изменения"}
                                            </Button>{" "}
                                            <Button
                                                onClick={() => {
                                                    setShowInfSyst(false);
                                                    // setSelectedAllTaxTypee([]);
                                                    // setTaxName("");
                                                    // setTaxValue([]);
                                                }}
                                            >
                                                Отменить
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            )}
                        </Overlay>
                    </Row>
                    <Table>
                        <tbody>{allInfosystemListShow}</tbody>
                    </Table>
                    <br />
                    {props.processType != 2 ? (
                        <div>
                            <Row>
                                Пошлины и сборы
                                <Button
                                    variant="outline-primary"
                                    style={{ width: "100%" }}
                                    ref={sbor}
                                    onClick={() => setShowSbor(!showSbor)}
                                >
                                    Укажите взимаемые при оказании услуги пошлины и сборы
                                </Button>
                                <Overlay target={sbor.current} show={showSbor} placement="bottom">
                                    {({ placement, arrowProps, show: _show, popper, ...props }) => (
                                        <div
                                            {...props}
                                            style={{
                                                border: "2px solid black",
                                                backgroundColor: "white",
                                                padding: "2px 10px",
                                                borderRadius: 3,
                                                width: "65%",
                                                ...props.style
                                            }}
                                        >
                                            <Row>
                                                <Col xs={4}>Тип сбора</Col>
                                                <Col xs={8}>
                                                    <Dropdown style={{ whiteSpace: "normal" }}>
                                                        <Dropdown.Toggle
                                                            as={CustomToggle}
                                                            id="dropdown-custom-components"
                                                        >
                                                            {selectedAllTaxTypee.length != 0
                                                                ? selectedAllTaxTypee.name
                                                                : "Выберите Тип сбора"}
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu as={CustomMenu}>
                                                            {/* {workList} */}
                                                            {AllTaxTypeDrop}
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                    {/* {selectedAllTaxTypeeTable} */}
                                                    {/* {selectedWorkList} */}
                                                </Col>
                                            </Row>
                                            <br />
                                            <Row>
                                                <Col xs={4}>Наименование</Col>
                                                <Col xs={8}>
                                                    <textarea
                                                        onChange={(e) => {
                                                            setTaxName(e.target.value);
                                                        }}
                                                        style={{ width: "100%" }}
                                                    ></textarea>
                                                </Col>
                                            </Row>
                                            <br />
                                            <Row>
                                                <Col xs={4}>Размер, рублей</Col>
                                                <Col xs={8}>
                                                    <input
                                                        onChange={(e) => {
                                                            setTaxValue(e.target.value);
                                                        }}
                                                        type="number"
                                                    ></input>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={9}></Col>
                                                <Col>
                                                    <Button
                                                        onClick={() => {
                                                            setShowSbor(false);
                                                            selectedAllTaxTypeeTableHelper(
                                                                selectedAllTaxTypee,
                                                                taxName,
                                                                taxValue
                                                            );
                                                        }}
                                                    >
                                                        Добавить
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Button
                                                        onClick={() => {
                                                            setShowSbor(false);
                                                            setSelectedAllTaxTypee([]);
                                                            setTaxName("");
                                                            setTaxValue([]);
                                                        }}
                                                    >
                                                        Отменить
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    )}
                                </Overlay>
                            </Row>
                            <br />
                            <Table>
                                <tbody>{selectedAllTaxTypeeTableShow}</tbody>
                            </Table>
                        </div>
                    ) : (
                        ""
                    )}
                    <Row>{props.processType == 2 ? "Длительность процесса" : "Срок предоставления услуги"}</Row>
                    <Row>
                        <Col xs={2}>фактический</Col>
                        <Col xs={2}>
                            <input
                                defaultValue={
                                    props.projPasport != undefined && props.projPasport.factDay != undefined
                                        ? props.projPasport.factDay.value
                                        : ""
                                }
                                style={{ width: "100%" }}
                                type="number"
                                onChange={(e) => {
                                    if (e.target.value < 0) {
                                        e.target.value = e.target.value * -1;
                                        setSelectedDayType1Value(e.target.value);
                                    } else {
                                        setSelectedDayType1Value(e.target.value);
                                    }
                                }}
                            ></input>
                        </Col>
                        <Col xs={1}></Col>
                        <Col xs={1}>дней</Col>
                        <Col xs={1}>
                            <DropdownButton
                                title={selectedDayType1.length != 0 ? selectedDayType1.name : "Выберите тип дней"}
                                variant="outline-primary"
                                style={{ whiteSpace: "normal" }}
                            >
                                {/* <Dropdown.Item>Рабочие</Dropdown.Item>
                    <Dropdown.Item>Календарные</Dropdown.Item> */}
                                {DayTypeDrop1}
                            </DropdownButton>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>нормативный</Col>
                        <Col xs={2}>
                            <input
                                defaultValue={
                                    props.projPasport != undefined &&
                                    props.projPasport != null &&
                                    props.projPasport.normativeDay != undefined
                                        ? props.projPasport.normativeDay.value
                                        : ""
                                }
                                style={{ width: "100%" }}
                                type="number"
                                onChange={(e) => {
                                    if (e.target.value < 0) {
                                        e.target.value = e.target.value * -1;
                                        setSelectedDayType1Value(e.target.value);
                                    } else {
                                        setSelectedDayType2Value(e.target.value);
                                    }
                                }}
                            ></input>
                        </Col>
                        <Col xs={1}></Col>
                        <Col xs={1}>дней</Col>
                        <Col xs={1}>
                            <DropdownButton
                                title={selectedDayType2.length != 0 ? selectedDayType2.name : "Выберите тип дней"}
                                variant="outline-primary"
                                style={{ whiteSpace: "normal" }}
                            >
                                {/* <Dropdown.Item>Рабочие</Dropdown.Item>
                    <Dropdown.Item>Календарные</Dropdown.Item> */}
                                {DayTypeDrop2}
                            </DropdownButton>
                        </Col>
                    </Row>
                    <br />
                    {props.processType != 2 ? (
                        <div>
                            Наличие признаков цифровой трансформации на текущий момент
                            <Form style={{ paddingBottom: "10px", paddingLeft: "10px", border: "1px dashed #59B1FF" }}>
                                <FormGroup>
                                    <Row>
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip id={`tooltip`}>
                                                    Наличие юридически значимого реестра с уникальными номерами
                                                    результатов оказания услуги
                                                </Tooltip>
                                            }
                                            placement="right"
                                        >
                                            <Col xs={5}>
                                                <Form.Check
                                                    onClick={() => {
                                                        setisCheck1(!ischeck1);
                                                    }}
                                                    type="checkbox"
                                                    label="Реестровость"
                                                    defaultChecked={
                                                        props.projPasport != undefined &&
                                                        props.projPasport != null &&
                                                        props.projPasport.digitalTrans != undefined &&
                                                        props.projPasport.digitalTrans != null &&
                                                        props.projPasport.digitalTrans.length > 0
                                                            ? props.projPasport.digitalTrans[0].flag
                                                            : false
                                                    }
                                                />
                                            </Col>
                                        </OverlayTrigger>

                                        <Col xs={6}>
                                            <textarea
                                                placeholder={"Укажите детальное описание (при необходимости)..."}
                                                defaultValue={
                                                    props.projPasport != undefined &&
                                                    props.projPasport != null &&
                                                    props.projPasport.digitalTrans != undefined &&
                                                    props.projPasport.digitalTrans != null &&
                                                    props.projPasport.digitalTrans.length > 0
                                                        ? props.projPasport.digitalTrans[0].disc
                                                        : ""
                                                }
                                                onChange={(e) => {
                                                    setCheck1(e.target.value);
                                                }}
                                                style={{ width: "100%" }}
                                            ></textarea>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip id={`tooltip`}>
                                                    Наличие сведений для проактивного информирования о возможности
                                                    получить услугу, а также возможность предзаполнение необходимых
                                                    данных
                                                </Tooltip>
                                            }
                                            placement="right"
                                        >
                                            <Col xs={5}>
                                                <Form.Check
                                                    onClick={() => {
                                                        setisCheck2(!ischeck2);
                                                    }}
                                                    type="checkbox"
                                                    label="Проактивность"
                                                    defaultChecked={
                                                        props.projPasport != undefined &&
                                                        props.projPasport != null &&
                                                        props.projPasport.digitalTrans != undefined &&
                                                        props.projPasport.digitalTrans != null &&
                                                        props.projPasport.digitalTrans.length > 1
                                                            ? props.projPasport.digitalTrans[1].flag
                                                            : false
                                                    }
                                                />
                                            </Col>
                                        </OverlayTrigger>
                                        <Col xs={6}>
                                            <textarea
                                                placeholder={"Укажите детальное описание (при необходимости)..."}
                                                defaultValue={
                                                    props.projPasport != undefined &&
                                                    props.projPasport != null &&
                                                    props.projPasport.digitalTrans != undefined &&
                                                    props.projPasport.digitalTrans != null &&
                                                    props.projPasport.digitalTrans.length > 1
                                                        ? props.projPasport.digitalTrans[1].disc
                                                        : ""
                                                }
                                                onChange={(e) => {
                                                    setCheck2(e.target.value);
                                                }}
                                                style={{ width: "100%" }}
                                            ></textarea>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip id={`tooltip`}>
                                                    Возможность подать заявление и получить результат оказания услуги
                                                    без привязки к территории
                                                </Tooltip>
                                            }
                                            placement="right"
                                        >
                                            <Col xs={5}>
                                                <Form.Check
                                                    onClick={() => {
                                                        setisCheck3(!ischeck3);
                                                    }}
                                                    type="checkbox"
                                                    label="Экстерриториальность"
                                                    defaultChecked={
                                                        props.projPasport != undefined &&
                                                        props.projPasport != null &&
                                                        props.projPasport.digitalTrans != undefined &&
                                                        props.projPasport.digitalTrans != null &&
                                                        props.projPasport.digitalTrans.length > 2
                                                            ? props.projPasport.digitalTrans[2].flag
                                                            : false
                                                    }
                                                />
                                            </Col>
                                        </OverlayTrigger>

                                        <Col xs={6}>
                                            <textarea
                                                placeholder={"Укажите детальное описание (при необходимости)..."}
                                                defaultValue={
                                                    props.projPasport != undefined &&
                                                    props.projPasport != null &&
                                                    props.projPasport.digitalTrans != undefined &&
                                                    props.projPasport.digitalTrans != null &&
                                                    props.projPasport.digitalTrans.length > 2
                                                        ? props.projPasport.digitalTrans[2].disc
                                                        : ""
                                                }
                                                onChange={(e) => {
                                                    setCheck3(e.target.value);
                                                }}
                                                style={{ width: "100%" }}
                                            ></textarea>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip id={`tooltip`}>
                                                    Возможность подать заявление и получить результат оказания услуги
                                                    несколькими способами (через МФЦ, через региональный портал гос.
                                                    услуг, через единый портал гос. услуг)
                                                </Tooltip>
                                            }
                                            placement="right"
                                        >
                                            <Col xs={5}>
                                                <Form.Check
                                                    onClick={() => {
                                                        setisCheck4(!ischeck4);
                                                    }}
                                                    type="checkbox"
                                                    label="Многоканальность"
                                                    defaultChecked={
                                                        props.projPasport != undefined &&
                                                        props.projPasport != null &&
                                                        props.projPasport.digitalTrans != undefined &&
                                                        props.projPasport.digitalTrans != null &&
                                                        props.projPasport.digitalTrans.length > 3
                                                            ? props.projPasport.digitalTrans[3].flag
                                                            : false
                                                    }
                                                />
                                            </Col>
                                        </OverlayTrigger>

                                        <Col xs={6}>
                                            <textarea
                                                placeholder={"Укажите детальное описание (при необходимости)..."}
                                                defaultValue={
                                                    props.projPasport != undefined &&
                                                    props.projPasport != null &&
                                                    props.projPasport.digitalTrans != undefined &&
                                                    props.projPasport.digitalTrans != null &&
                                                    props.projPasport.digitalTrans.length > 3
                                                        ? props.projPasport.digitalTrans[3].disc
                                                        : ""
                                                }
                                                onChange={(e) => {
                                                    setCheck4(e.target.value);
                                                }}
                                                style={{ width: "100%" }}
                                            ></textarea>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip id={`tooltip`}>
                                                    Возможность задания критериев принятия решения и автоматической
                                                    проверки заявления с дальнейшим принятием решения автоматизированной
                                                    системой
                                                </Tooltip>
                                            }
                                            placement="right"
                                        >
                                            <Col xs={5}>
                                                <Form.Check
                                                    onClick={() => {
                                                        setisCheck5(!ischeck5);
                                                    }}
                                                    type="checkbox"
                                                    label="Исключение человека из процесса принятия решений"
                                                    defaultChecked={
                                                        props.projPasport != undefined &&
                                                        props.projPasport != null &&
                                                        props.projPasport.digitalTrans != undefined &&
                                                        props.projPasport.digitalTrans != null &&
                                                        props.projPasport.digitalTrans.length > 4
                                                            ? props.projPasport.digitalTrans[4].flag
                                                            : false
                                                    }
                                                />
                                            </Col>
                                        </OverlayTrigger>

                                        <Col xs={6}>
                                            <textarea
                                                placeholder={"Укажите детальное описание (при необходимости)..."}
                                                defaultValue={
                                                    props.projPasport != undefined &&
                                                    props.projPasport != null &&
                                                    props.projPasport.digitalTrans != undefined &&
                                                    props.projPasport.digitalTrans != null &&
                                                    props.projPasport.digitalTrans.length > 4
                                                        ? props.projPasport.digitalTrans[4].disc
                                                        : ""
                                                }
                                                onChange={(e) => {
                                                    setCheck5(e.target.value);
                                                }}
                                                style={{ width: "100%" }}
                                            ></textarea>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Form>
                            <Form
                                style={{
                                    paddingBottom: "10px",
                                    marginTop: "10px",
                                    paddingLeft: "10px",
                                    border: "1px dashed #59B1FF"
                                }}
                            >
                                <Row>
                                    <Col xs={5}>
                                        <Form.Check
                                            onClick={() => {
                                                setisCheck6(!ischeck6);
                                            }}
                                            defaultChecked={
                                                props.projPasport != undefined &&
                                                props.projPasport != null &&
                                                props.projPasport.electronicDocumentFlowMFC != undefined &&
                                                props.projPasport.electronicDocumentFlowMFC != null
                                                    ? props.projPasport.electronicDocumentFlowMFC.flag
                                                    : false
                                            }
                                            type="checkbox"
                                            label="Электронный документооборот с МФЦ"
                                        />
                                    </Col>
                                    <Col xs={6}>
                                        <textarea
                                            placeholder={"Укажите детальное описание (при необходимости)..."}
                                            defaultValue={
                                                props.projPasport != undefined &&
                                                props.projPasport != null &&
                                                props.projPasport.electronicDocumentFlowMFC != undefined &&
                                                props.projPasport.electronicDocumentFlowMFC != null
                                                    ? props.projPasport.electronicDocumentFlowMFC.disc
                                                    : ""
                                            }
                                            onChange={(e) => {
                                                setCheck6(e.target.value);
                                            }}
                                            style={{ width: "100%" }}
                                        ></textarea>
                                    </Col>
                                </Row>
                            </Form>
                            <br />
                        </div>
                    ) : (
                        ""
                    )}
                    {props.processType == 1 && (
                        <div>
                            <Row>
                                Заявочный комплект
                                <Button
                                    variant="outline-primary"
                                    style={{ width: "100%" }}
                                    ref={badplays}
                                    onClick={() => {
                                        setShowBadplays(!showBadplays);
                                        setProcDocName("");
                                        setProcDocRequired(undefined);
                                        setProcDocComment("");
                                    }}
                                >
                                    Укажите документы, необходимые для получения услуги...
                                </Button>
                                <Overlay target={badplays.current} show={showBadplays} placement="bottom">
                                    {({ placement, arrowProps, show: _show, popper, ...props }) => (
                                        <div
                                            {...props}
                                            style={{
                                                border: "2px solid black",
                                                backgroundColor: "white",
                                                padding: "2px 10px",
                                                borderRadius: 3,
                                                width: "65%",
                                                ...props.style
                                            }}
                                        >
                                            <Row>
                                                <Col xs={4}>Наименование документа</Col>
                                                <Col xs={8}>
                                                    <textarea
                                                        onChange={(e) => {
                                                            setProcDocName(e.target.value);
                                                        }}
                                                        style={{ width: "100%" }}
                                                        placeholder="Укажите наименование документа..."
                                                    ></textarea>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4}>Обязательность</Col>
                                                <Col xs={8}>
                                                    <DropdownButton
                                                        title={
                                                            ProcDocRequired != undefined
                                                                ? ProcDocRequired
                                                                    ? "Обязательный"
                                                                    : "Не обязательный"
                                                                : "Укажите обязательность"
                                                        }
                                                    >
                                                        <Dropdown.Item
                                                            onClick={() => {
                                                                setProcDocRequired(true);
                                                            }}
                                                        >
                                                            Да
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            onClick={() => {
                                                                setProcDocRequired(false);
                                                            }}
                                                        >
                                                            Нет
                                                        </Dropdown.Item>
                                                    </DropdownButton>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4}>Детальное описание</Col>
                                                <Col xs={8}>
                                                    <textarea
                                                        onChange={(e) => {
                                                            setProcDocComment(e.target.value);
                                                        }}
                                                        style={{ width: "100%" }}
                                                        placeholder="Укажите детальное описание документа (при необходимости)..."
                                                    ></textarea>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4}>Примечание</Col>
                                                <Col xs={8}>
                                                    <textarea
                                                        onChange={(e) => {
                                                            setProcDocNote(e.target.value);
                                                        }}
                                                        style={{ width: "100%" }}
                                                        placeholder="Укажите комментарий (при необходимости)..."
                                                    ></textarea>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={9}></Col>
                                                <Col>
                                                    <Button
                                                        disabled={
                                                            ProcDocRequired === undefined ||
                                                            ProcDocName === undefined ||
                                                            ProcDocName === ""
                                                        }
                                                        onClick={() => {
                                                            console.log("AA");
                                                            AddApplicationKit(
                                                                ProcDocName,
                                                                ProcDocRequired,
                                                                ProcDocComment,
                                                                ProcDocNote
                                                            );
                                                            setShowBadplays(false);
                                                        }}
                                                    >
                                                        Добавить
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Button
                                                        onClick={() => {
                                                            setShowBadplays(false);
                                                        }}
                                                    >
                                                        Отменить
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    )}
                                </Overlay>
                            </Row>
                            <Table>
                                <tbody>{showApplicationKit}</tbody>
                            </Table>
                        </div>
                    )}
                    <br />
                    <Row>Нормативная база</Row>
                    <Row>
                        {/* {console.log(props.addDocument,'props.addDocument')} */}
                        <FileComponentEdit
                            taskId={4}
                            NPATypeList={props.NPATypeList}
                            addDocument={props.addDocument}
                            projId={props.projId}
                        />
                    </Row>
                    <Table>
                        <tbody>{fileTable}</tbody>
                    </Table>
                    <br />
                    <Row>
                        Цель оптимизации
                        <textarea
                            defaultValue={props.projPasport != undefined ? props.projPasport.optimisationReason : ""}
                            onChange={(e) => {
                                setOptimisationReason(e.target.value);
                            }}
                            style={{ width: "100%" }}
                            placeholder="Укажите цель оптимизации..."
                        ></textarea>
                    </Row>
                    <br />
                    <Row>
                        Результат оптимизации
                        <textarea
                            defaultValue={props.projPasport != undefined ? props.projPasport.optimisationResult : ""}
                            onChange={(e) => {
                                setOptimisationResult(e.target.value);
                            }}
                            style={{ width: "100%" }}
                            placeholder="Укажите планируемый результат оптимизации..."
                            textarea
                        ></textarea>
                    </Row>
                    <br />
                    <Row>
                        Прочая информация
                        <textarea
                            defaultValue={props.projPasport != undefined ? props.projPasport.other : ""}
                            onChange={(e) => {
                                setComment(e.target.value);
                            }}
                            style={{ width: "100%" }}
                            placeholder="Укажите прочую информацию о процессе (при необходимости)..."
                        ></textarea>
                    </Row>
                    {props.processType != 2 ? (
                        <div>
                            <Row>
                                Ссылка на ЕПГУ
                                <textarea
                                    // defaultValue={props.projPasport!= undefined?props.projPasport.other:''}
                                    defaultValue={
                                        props.projPasport != null && props.projPasport != null
                                            ? props.projPasport.refEPGU
                                            : ""
                                    }
                                    onChange={(e) => {
                                        // if (
                                        //     !(
                                        //         e.target.value.includes("http://") ||
                                        //         e.target.value.includes("https://")
                                        //     ) &&
                                        //     e.target.value != "" &&
                                        //     e.target.value != "http://"
                                        // ) {
                                        //     e.target.value = "http://" + e.target.value;
                                        // }
                                        setRefEPGU(e.target.value);
                                    }}
                                    style={{ width: "100%" }}
                                    placeholder="Укажите ссылку на описание услуги на едином портале госуслуг..."
                                ></textarea>
                                <a
                                    href={
                                        props.projPasport != null && props.projPasport != null
                                            ? props.projPasport.refEPGU
                                            : ""
                                    }
                                    target="_blank"
                                >
                                    <Button>
                                        <img
                                            src="/assets/images/arrow_right_solid.svg"
                                            style={{ height: "24px", width: "24px" }}
                                        ></img>
                                    </Button>
                                </a>
                            </Row>
                            <Row>
                                Ссылка на РПГУ
                                <textarea
                                    //  defaultValue={props.projPasport!= undefined?props.projPasport.other:''}
                                    defaultValue={
                                        props.projPasport != null && props.projPasport != null
                                            ? props.projPasport.refRPGU
                                            : ""
                                    }
                                    onChange={(e) => {
                                        // if (
                                        //     !(
                                        //         e.target.value.includes("http://") ||
                                        //         e.target.value.includes("https://")
                                        //     ) &&
                                        //     e.target.value != "" &&
                                        //     e.target.value != "http://"
                                        // ) {
                                        //     e.target.value = "http://" + e.target.value;
                                        // }
                                        setRefRPGU(e.target.value);
                                    }}
                                    style={{ width: "100%" }}
                                    placeholder="Укажите ссылку на описание услуги на региональном портале госуслуги..."
                                ></textarea>
                                <a
                                    href={
                                        // props.projPasport != null && props.projPasport != null
                                        //     ? props.projPasport.refRPGU
                                        //     : ""
                                        refRPGU
                                    }
                                    target="_blank"
                                >
                                    <Button>
                                        <img
                                            src="/assets/images/arrow_right_solid.svg"
                                            style={{ height: "24px", width: "24px" }}
                                        ></img>
                                    </Button>
                                </a>
                            </Row>
                        </div>
                    ) : (
                        ""
                    )}
                </>
            ) : (
                ""
            )}
            {page === "Визуализация" ? (
                <>
                    <br></br>
                    <Iframe
                        url={getServiceUrl(
                            `static-report/web/report-desktop-war-lenOblProcess.html?reportId=9c674ad9-272a-4e80-a937-96d83e363d83&version=05.09.2020%2013.54.33.044&device=Desktop&paramProj=${props.projId}`
                        )}
                        width="100%"
                        height="2800px"
                        id="myId"
                        className="myClassname"
                        display="initial"
                        position="relative"
                        frameBorder={0}
                        styles={{ border: "0px solid white" }}
                    />
                </>
            ) : (
                ""
            )}
        </>
    );
}

export default PasportFields;
