import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { set } from "mongoose";
import { use } from "passport";
import moment from "moment";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/user";
import { Navbar } from "../../../components/layout/Navbar";

// export const getServerSideProps = async () => {
//   const res = await fetch(`${process.env.Baseurl}/api/admin/art`);
//   const data = await res.json();
//     console.log('+++++', data)
//   const paths = data.map((user_id) => {
//     return {
//       props: { userData: data },
//     };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// };

export const getServerSideProps = async (context) => {
  console.log("localPort", process.env.Baseurl);
  const id = context.params.id;
  const res = await fetch(`${process.env.Baseurl}/api/admin/art/` + id);
  const data = await res.json();
  return {
    props: { userData: data },
  };
};

const Details = ({ userData }) => {
  const editaDetals = userData;
  const router = useRouter();
  const [name, setName] = useState("");
  const [cetagory, setCetagory] = useState("");
  const [description, setdescription] = useState("");
  const [status, setStatus] = useState(false);
  const [feature, setFeature] = useState(false);
  const [Auctioned, setAuctioned] = useState(false);
  const [StartAuction, setStartAuction] = useState("");
  const [EndAuction, setEndAuction] = useState("");

  const [user, { mutate }] = useCurrentUser();
  useEffect(() => {
    if (user === null) useRouter.replace('/login')
  }, [user])

  useEffect(() => {
    console.log(`userData`, userData);
    console.log(userData);
    setCetagory(userData.Category);
    setdescription(userData.Description);
    setName(userData.name);
    setStatus(userData.Status);
    setAuctioned(userData.Auctioned);
    setFeature(userData.Featured);
    setStartAuction(moment(userData.StartAuction).format("YYYY-MM-DD"));
    setEndAuction(moment(userData.EndAuction).format("YYYY-MM-DD"));

    // if(userData.Status==='true'){
    //   setStatus(true)
    // } else{
    //  setStatus(false)
    // }
  }, []);

  useEffect(() => {}, [status]);
  useEffect(() => {
    if (!Auctioned) {
      console.log("asdadsaada");
      setStartAuction("");
      setEndAuction("");
    } else {
      setStartAuction(moment(userData.StartAuction).format("YYYY-MM-DD"));
      setEndAuction(moment(userData.EndAuction).format("YYYY-MM-DD"));
    }
  }, [Auctioned]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeCetagory = (e) => {
    setCetagory(e.target.value);
  };
  const handleStartAuction = (e) => {
    setStartAuction(e.target.value);
  };
  const handleEndAuction = (e) => {
    setEndAuction(e.target.value);
  };

  const handleChangeDiscription = (e) => {
    setdescription(e.target.value);
  };
  const handleStatus = (e) => {
    setStatus(e.target.checked);
  };

  const handleFeature = (e) => {
    setFeature(e.target.checked);
  };

  const handleAuction = (e) => {
    setAuctioned(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      Category: cetagory,
      name: name,
      Description: description,
      Status: status,
      Featured: feature,
      StartAuction: StartAuction,
      EndAuction: EndAuction,
      Auctioned: Auctioned,
    };
    console.log("body is", body);

    const res = await fetch(
      `${process.env.Baseurl}/api/admin/art/${userData._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (res.status == 200) {
      router.push("../");
    }
  };

  return (
    <>
      {user != null && (
      <>
        <Navbar />
        <div className="page-wrapper">
          {/* ============================================================== */}
          {/* Bread crumb and right sidebar toggle */}
          {/* ============================================================== */}

          <div className="edit-page main-col">
            <div className="app-content">
              <div className="container-fluid">
                <h3 className="section-title">Edit Art</h3>

                <div className="col-12 col-md-12">
                  <div className="app-card app-card-settings shadow-sm p-4">
                    <div className="app-card-body">
                      <form className="settings-form" onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label for="name" className="form-label">
                            Name
                            <span
                              className="ms-2"
                              data-container="body"
                              data-bs-toggle="popover"
                              data-trigger="hover"
                              data-placement="top"
                              data-content="This is a Bootstrap popover example. You can use popover to provide extra info."
                            >
                              <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 16 16"
                                className="bi bi-info-circle"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                                />
                                <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
                                <circle cx="8" cy="4.5" r="1" />
                              </svg>
                            </span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={(e) => handleChangeName(e)}
                          />
                        </div>
                        <div className="mb-3">
                          <label for="cetagory" className="form-label">
                            Category
                          </label>
                          <input
                            type="text"
                            id="cetagory"
                            value={cetagory}
                            className="form-control"
                            onChange={(e) => handleChangeCetagory(e)}
                          />
                        </div>
                        <div className="mb-3">
                          <label for="description" className="form-label">
                            Description
                          </label>
                          <textarea
                            rows="5"
                            id="description"
                            value={description}
                            className="form-control"
                            onChange={(e) => handleChangeDiscription(e)}
                          />
                        </div>
                        <div class="form-check mb-3">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            name="status"
                checked={status ? true : false}
                onChange={(e) => {
                  handleStatus(e);
                }}
                            id="settings-checkbox-1"
                          />
                          <label
                            class="form-check-label"
                            for="settings-checkbox-1"
                          >
                            Status
                          </label>
                        </div>
                        <div class="form-check mb-3">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            name="feature"
                            checked={feature ? true : false}
                            onChange={(e) => {
                              handleFeature(e);
                            }}
                            id="settings-checkbox-2"
                          />
                          <label
                            class="form-check-label"
                            for="settings-checkbox-2"
                          >
                            Feature
                          </label>
                        </div>
                        {Auctioned ? <>

                          <div class="form-check mb-3">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            name="Auctioned"
                            checked={Auctioned ? true : false}
                            onChange={(e) => {
                              handleFeature(e);
                            }}
                            disabled
                            id="Auctioned"
                          />
                          <label
                            class="form-check-label"
                            for="Auctioned"
                          >
                            Auction
                          </label>
                        </div>
                            <div class="row">
                        <div className="col-6">
                        <div className="mb-3">
                          <label for="StartAuction" className="form-label">
                            Start Date
                          </label>
                          <input
                           type="date"
                           value={StartAuction}
                           className="form-control"
                           disabled
                           onChange={(e) => handleStartAuction(e)}
                           id="StartAuction"
                          />
                        </div>
                        </div>
                        <div className="col-6">
                        <div className="mb-3">
                          <label for="EndAuction" className="form-label">
                            End Date
                          </label>
                          <input
                          type="date"
                          value={EndAuction}
                          className="form-control"
                          id="EndAuction"
                          disabled
                          onChange={(e) => handleEndAuction(e)}
                          />
                        </div>
                          </div>
                          </div>
                        </>:''}

                        <button type="submit" className="btn app-btn-primary">
                          Save Changes
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
       )} 
    </>
  );
};

export default Details;
