import React, { useState } from "react";
import OperatingField from "./OperatingField";
import MenuButton from "../../MenuButton";
import TrelloBoard from "./Trello/TrelloBoard";

const pages = ["Изменить данные", "Прикрепить файлы"];

function Operating(props) {
    const [currentPage, setPage] = useState(pages[0]);

    return (
        <>
            <div>
                <b>Оптимизационные решения</b>
            </div>
            <div>Собрать наработки мер по оптимизационного процесса </div>
            <br />

            <div className="w-25" style={{ display: "flex" }}>
                {pages.map((page) => (
                    <MenuButton
                        key={page}
                        active={currentPage === page}
                        onClick={() => {
                            setPage(page);
                        }}
                    >
                        {page}
                    </MenuButton>
                ))}
            </div>

            {currentPage === "Изменить данные" && <TrelloBoard projectId={props.projId} />}

            {currentPage === "Прикрепить файлы" && (
                <div>
                    <OperatingField
                        type={props.type}
                        OPERATINGtable={props.OPERATINGtable}
                        projId={props.projId}
                        addDocument={props.addDocument}
                        saveFile={props.saveFile}
                    />
                </div>
            )}
        </>
    );
}

export default Operating;
