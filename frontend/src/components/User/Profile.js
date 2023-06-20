import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import { convertDateDBtoIndo } from "../../utils/formatTanggal";

const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  // console.log("user:", user.nama);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.nama}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.nama} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.nama}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Bergabung Pada</h4>
                <p>
                  {convertDateDBtoIndo(String(user.createdAt).substr(0, 10))}
                </p>
              </div>

              <div>
                <Link to="/orders">Pesanan</Link>
                <Link to="/password/update">Ubah Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
