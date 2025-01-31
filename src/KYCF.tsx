import React, { useEffect, useRef, useState } from "react";
import ss from "./sass/KYCF.module.scss";
import { Button, ButtonGroup, Paper, TextField } from "@mui/material";
import { Calendar } from "primereact/calendar";
import "primeicons/primeicons.css";
import front from "./img/id-front.svg";
import back from "./img/id-back.svg";
import none from "./img/noimage.jpg";

export default function KYCF({ header, info, fields }: KYCTFormParams) {
  //FORM DATA
  // fields.address.

  //PAGE NAVIGATION
  const [pgCount, setPgCount] = useState(0);
  //PAGE NAVIGATION

  //Form Data Seperate for each page
  const formData: React.MutableRefObject<FormDataTyp[]> = useRef([[], [], []]);

  useEffect(() => {
    //INITIALIZING FORM DATA
    if (!formData.current[pgCount].length && pgCount != 2) {
      fields[categories[pgCount]].fields?.forEach((name, i) => {
        formData.current[pgCount].push({
          name: name,
          value: "",
          required: i != fields[categories[pgCount]].optional,
        });
      });

      console.log(formData.current);
    }
  }, [pgCount]);

  ////ERRORS
  const [errors, setErrors] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  //

  ///VALIDATE ERRORS
  function valErrs() {}
  ///

  ////FILES UPLOAD
  const [idType, setIdType] = useState(0);
  const [fileFace, setFileFace] = useState("front");

  const [idView, setidView] = useState({ front: undefined, back: undefined });
  //FILE UPLOAD

  const customButton = (label: string, i: number) => {
    let className = idType == i ? ss.select : ss.unselect;
    return (
      <div
        key={i}
        onClick={() => {
          if (fileFace == "front") setIdType(i);
        }}
        className={ss.btn + " " + className}
      >
        <span>{label}</span>
        <div className={className}>
          <i className="pi pi-check"></i>
        </div>
      </div>
    );
  };

  const arrowBtn = (direction: "front" | "back" | string) => {
    switch (direction) {
      case "front":
        return (
          <div
            onClick={() => {
              setFileFace("back");
            }}
            className={ss.arrowbx}
          >
            Backside <i className="pi pi-arrow-right"></i>
          </div>
        );

      case "back":
        return (
          <div
            onClick={() => {
              setFileFace("front");
            }}
            className={ss.arrowbx}
          >
            <i className="pi pi-arrow-left"></i> Frontside
          </div>
        );
    }
  };

  //
  const uploadFace = (direction: "front" | "back" | string) => {
    const i = ["front", "back"].indexOf(direction);

    return (
      <div className={ss.two}>
        <div className={ss.uploadbox}>
          <input
            onChange={(e) => {
              if (e.target.files?.length) {
                formData.current[pgCount][i].value = e.target.files[0];
                setidView({
                  ...idView,
                  [direction]: URL.createObjectURL(e.target.files[0]),
                });
              }
            }}
            accept="image/*"
            type="file"
            id="mx-kyc-fileup"
            style={{ display: "none" }}
          />
          <span>
            <Button
              onClick={() => {
                document.getElementById("mx-kyc-fileup")?.click();
              }}
              variant="contained"
            >
              Upload
            </Button>
          </span>
          <img src={idView[direction] || none} alt="---------------" />
        </div>
        <div className={ss.describe}>
          <img src={idfaces[direction]}></img>
          {idView[direction] || fileFace == "back"
            ? arrowBtn(direction)
            : undefined}
        </div>
      </div>
    );
  };
  //

  const normalTemplate = (content?: KYCCategory[CatKey]) => {
    let body = <></>;
    switch (pgCount) {
      case 2:
        body = (
          <div className={ss.uploadbody}>
            <div className={ss.one}>
              {content?.fields?.map((id, i) => customButton(id, i))}
            </div>

            {uploadFace(fileFace)}
          </div>
        );
        break;

      default:
        body = normalTempBody(content);
    }
    return (
      <div className={ss.page}>
        <Paper className={ss.content}>
          <div className={ss.head}>
            <div className={ss.counter}>{"0" + (pgCount + 1)}</div>
            <div className={ss.headerBox}>
              <div className={ss.title}>{content?.title}</div>
              <div className={ss.info}>
                {pgCount == 2 ? content?.info : inputText}
              </div>
            </div>
          </div>
          <hr />
          {body}
        </Paper>
      </div>
    );
  };

  const pages = [
    normalTemplate(fields.personal),
    normalTemplate(fields.address),
    normalTemplate(fields.document),
    finalPage(),
  ];

  return (
    <div className={ss.parent}>
      <div className={ss.headerBox}>
        <div className={ss.title}>{header}</div>
        <div className={ss.info}>{info}</div>
      </div>
      {pages[pgCount]}
      <div className={ss.btngroup}>
        {pgCount > 0 && pgCount < 3 ? (
          <Button
            variant="contained"
            onClick={() => {
              setPgCount((p) => p - 1);
            }}
          >
            Previous
          </Button>
        ) : undefined}
        {pgCount < 3 ? (
          <Button
            onClick={() => {
              setPgCount((p) => p + 1);
            }}
            variant="contained"
          >
            Next
          </Button>
        ) : undefined}
      </div>
    </div>
  );
}

const idfaces = { front, back };
const categories: CatKey[] = ["personal", "address", "document"];
const arrows = {
  front: "pi pi-arrow-right",
  back: "pi pi-arrow-left",
};
const inputText =
  "Kindly input your correct details. This information can't be edited after submission";
const uploadText =
  "Kindly select an available ID from options below and upload an eligible copy";

const normalTempBody = (content) => {
  return (
    <div className={ss.body}>
      {content.fields?.map((label, i) => {
        const required = i !== content?.optional;
        if (label.toLowerCase().includes("date")) {
          return (
            <Calendar
              key={i}
              placeholder="Date of Birth *"
              className={ss.textfield}
            />
          );
        } else {
          return (
            <div key={i} className={ss.textfield}>
              <TextField required={required} size="small" label={label} />
            </div>
          );
        }
      })}
    </div>
  );
};

const finalPage = () => {
  return (
    <div className={ss.page}>
      <Paper className={ss.content + " " + ss.lastcontent}>
        Your Information is under review. <br />
        We'll get back to you shortly
      </Paper>
    </div>
  );
};
