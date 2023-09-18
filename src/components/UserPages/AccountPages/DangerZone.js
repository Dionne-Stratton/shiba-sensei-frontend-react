import React from "react";
import axiosWithAuth from "../../Auth/axiosWithAuth";
import { useHistory } from "react-router-dom";

export default function DangerZone(props) {
  const { lesson1, setAuth, setUser } = props;
  const history = useHistory();

  const resetProgress = {
    user_vocab: [],
    available_lesson: 1,
    user_lessons: lesson1,
  };

  const onReset = () => {
    axiosWithAuth //put the user with the updated vocab and lessons
      .put("profile", resetProgress)
      .then((res) => {
        console.log("Reset res:", res.data);
        setUser(res.data);
        alert("Progress Reset");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDelete = () => {
    axiosWithAuth //delete the user
      .delete("profile")
      .then((res) => {
        console.log("res:", res.data);
        localStorage.removeItem("token");
        setAuth(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="main-page danger-zone">
      <h1>Danger Zone:</h1>
      <h2>Warning: any actions taken here cannot be undone!</h2>
      {/* button to reset account progress */}
      <h3>Reset Account Progress</h3>
      <p>
        Click the reset progress button to reset your progress on all lessons
        and reviews.
      </p>
      <button onClick={onReset}>Reset Progress</button>
      {/* button to delete account */}
      <h3>Delete Account</h3>
      <p>
        Click the delete account button to delete your account and all
        associated data.
      </p>
      <button onClick={onDelete}>Delete Account</button>
    </div>
  );
}
