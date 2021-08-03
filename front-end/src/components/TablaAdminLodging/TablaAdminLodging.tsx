import React, { useState, useEffect } from "react";
import { fetchCardsHotels, getUsersList } from "../../actions";
import "./Tabla.css";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import Swal from "sweetalert2";
import MenuAdmin from "../menuAdmin/MenuAdmin";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

function TablaAdmin() {
  const user = useSelector((state: any) => state.listOfUsers);
  const [data, setData] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(0);
  const [name, setName] = useState({});

  const onChange = (e: any) => {
    setName({
      ...name,
      [e.target.name]: e.target.value ? e.target.value : "Active",
    });
    const obj = { [e.target.name]: e.target.value, email: e.target.name };

    if (obj[e.target.name] === "Active") {
      axios.post("http://localhost:3001/admin/suspended", {
        email: e.target.name,
      });
    } else {
      axios.post("http://localhost:3001/admin/habilite", {
        email: e.target.name,
      });
    }
    dispatch(getUsersList());
  };

  const filteredUsers = user?.slice(currentPage, currentPage + 8);

  const nextPage = () => {
    if (user.length < currentPage + 8) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage + 8);
    }
  };

  const prevPage = () => {
    if (currentPage < 7) {
      setCurrentPage(0);
    } else {
      setCurrentPage(currentPage - 8);
    }
  };

  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  const handleClickChange = (e) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div className="con-homeAdmin">
      <MenuAdmin />
      <div style={{ display: "grid" }}>
        <h2
          style={{
            margin: "0",
            paddingTop: "1rem",
            marginTop: "1rem",
            color: "black",
            textShadow: "1.4px 1.4px 1px #B2B1B9",
            fontSize: "calc(2vw + 1em)",
          }}
          className="title"
        >
          Registered Users
        </h2>
        <div className="container-tabla">
          <div className="grid-tabla color-grid">
            {" "}
            <p>Name</p>
            <p>Phone Number</p>
            <p>Country</p>
            <p>Account status</p>
            <p>Change Status</p>
          </div>

          {filteredUsers &&
            filteredUsers.map((x, i) => (
              <div key={i} className="grid-tabla">
                <p style={{ margin: "14px" }}>{x.name}</p>{" "}
                <p style={{ margin: "14px" }}>{x.phone_number}</p>
                <p style={{ margin: "14px" }}>{x.nationality}</p>
                <p style={{ margin: "14px" }}>{x.status_account}</p>
                {/* <input style={{ margin: "14px" }} type="checkbox" /> */}
                <button
                  name={x.email}
                  value={x.status_account}
                  onClick={(e) => {
                    handleClickChange(e);
                    onChange(e);
                  }}
                  style={{ margin: "14px" }}
                  className="boton-map"
                >
                  Change
                </button>
              </div>
            ))}
        </div>
        <div style={{ margin: "0 auto" }}>
          <button className="pagButton" onClick={prevPage}>
            ⮜ Prev Page
          </button>
          <button className="pagButton" onClick={nextPage}>
            Next Page ⮞
          </button>
        </div>
      </div>
    </div>
  );
}

export default TablaAdmin;