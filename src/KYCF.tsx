import React, { useEffect, useRef, useState } from "react";
import ss from "./sass/KYCF.module.scss";
import { Button, ButtonGroup, Paper, TextField } from "@mui/material";
import { Calendar } from "primereact/calendar";
import "primeicons/primeicons.css";
import front from "./img/id-front.svg";
import back from "./img/id-back.svg";
import none from "./img/noimage.jpg";

export default function KYCF({ header, info, fields }: KYCTFormParams) {
  const formData = useRef({});
  const [pgCount, setPgCount] = useState(0);
  const [idType, setIdType] = useState(0);
  const [fileFace, setFileFace] = useState("front");
  const idRef = useRef({
    front: {},
    back: {},
  });
  const [idView, setidView] = useState({ front: undefined, back: undefined });
  useEffect(() => {
    console.log(idType);
  }, [idType]);

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

  //cURENT
  const uploadFace = (direction: "front" | "back" | string) => {
    return (
      <div className={ss.two}>
        <div className={ss.uploadbox}>
          <input
            onChange={(e) => {
              if (e.target.files?.length) {
                idRef.current[direction] = e.target.files[0];
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

  const normalTemplate = (content: KYCCategory[CatKey]) => {
    let body = <></>;
    switch (pgCount) {
      case 2:
        body = (
          <div className={ss.uploadbody}>
            <div className={ss.one}>
              {content.fields?.map((id, i) => customButton(id, i))}
            </div>

            {uploadFace(fileFace)}
          </div>
        );
        break;
      case 3:
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
              <div className={ss.title}>{content.title}</div>
              <div className={ss.info}>
                {pgCount == 2 ? uploadText : inputText}
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
  ];

  return (
    <div className={ss.parent}>
      <div className={ss.headerBox}>
        <div className={ss.title}>{header}</div>
        <div className={ss.info}>{info}</div>
      </div>
      {pages[pgCount]}
      <div className={ss.btngroup}>
        {pgCount > 0 ? (
          <Button
            variant="contained"
            onClick={() => {
              setPgCount((p) => p - 1);
            }}
          >
            Previous
          </Button>
        ) : undefined}
        <Button
          onClick={() => {
            setPgCount((p) => p + 1);
          }}
          variant="contained"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

const idfaces = { front, back };
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
