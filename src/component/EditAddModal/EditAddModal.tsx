import React from "react";
import styles from "./EditAddModal.module.scss";
import { ValueToTime, useMyContext } from "../../context/DataProvider";

const EditAddModal = () => {
  const { state, handleState } = useMyContext();
  const handleClick = (buttonType: "Cancel" | "Done" | "Update") => {
    buttonType === "Cancel"
      ? handleState({
          isModalOpen: false,
          modalType: "None",
        })
      : buttonType === "Done"
      ? handleState({
          isModalOpen: false,
          apiData: [
            ...state.apiData,
            {
              Id: `Data${
                +state.apiData[state.apiData.length - 1].Id[
                  state.apiData[state.apiData.length - 1].Id.length - 1
                ] + 1
              }`,
              Title: state.modalDeatils.Title,
              Description: state.modalDeatils.Description,
              Subject: state.modalDeatils.Subject,
              Schedule:
                state.modalDeatils.Frequency !== "Daily"
                  ? `${state.modalDeatils.Frequency} on ${
                      state.modalDeatils.Repeat
                    } at ${ValueToTime(state.modalDeatils.Time)}`
                  : `${state.modalDeatils.Frequency} at ${ValueToTime(
                      state.modalDeatils.Time
                    )}`,
            },
          ],
          modalType: "None",
        })
      : handleState({
          isModalOpen: false,
          apiData: [
            ...state.apiData.map((ele) =>
              ele.Id === state.clickedDataId
                ? {
                    Id: state.clickedDataId,
                    Title: state.modalDeatils.Title,
                    Description: state.modalDeatils.Description,
                    Subject: state.modalDeatils.Subject,
                    Schedule:
                      state.modalDeatils.Frequency !== "Daily"
                        ? `${state.modalDeatils.Frequency} on ${
                            state.modalDeatils.Repeat
                          } at ${ValueToTime(state.modalDeatils.Time)}`
                        : `${state.modalDeatils.Frequency} at ${ValueToTime(
                            state.modalDeatils.Time
                          )}`,
                  }
                : ele
            ),
          ],
          modalType: "None",
        });
  };
  const HandleChange = ({ Key, Value }: { Key: string; Value: string }) => {
    if (state.modalDeatils.Frequency === "Weekly") {
      if (Key === "Repeat") {
        state.modalDeatils.Repeat.split(" ").includes(Value)
          ? handleState({
              modalDeatils: {
                ...state.modalDeatils,
                Repeat: [
                  ...state.modalDeatils.Repeat.split(" ").filter(
                    (ele) => ele !== Value
                  ),
                ].join(" "),
              },
            })
          : handleState({
              modalDeatils: {
                ...state.modalDeatils,
                Repeat: state.modalDeatils.Repeat + " " + Value,
              },
            });
      } else
        handleState({ modalDeatils: { ...state.modalDeatils, [Key]: Value } });
    } else
      handleState({ modalDeatils: { ...state.modalDeatils, [Key]: Value } });
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.heading}>
        {state.modalType === "Edit" ? "Edit Schedule" : "Add Schedule"}
      </div>
      <div>
        <label htmlFor="title">Title</label>
        <input
          required
          type="text"
          id="title"
          value={state.modalDeatils.Title}
          onChange={(e) =>
            HandleChange({ Key: "Title", Value: `${e.currentTarget.value}` })
          }
        />
      </div>
      <div className={styles.Description}>
        <label htmlFor="Description">Description</label>
        <textarea
          required
          id="Description"
          value={state.modalDeatils.Description}
          onChange={(e) =>
            HandleChange({
              Key: "Description",
              Value: `${e.currentTarget.value}`,
            })
          }
        />
      </div>
      <div>
        <label htmlFor="Subject">Subject</label>
        <input
          required
          type="text"
          id="Subject"
          value={state.modalDeatils.Subject}
          onChange={(e) =>
            HandleChange({
              Key: "Subject",
              Value: `${e.currentTarget.value}`,
            })
          }
        />
      </div>
      <div>
        <label htmlFor="Frequency">Frequency</label>
        <select
          required
          id="Frequency"
          value={state.modalDeatils.Frequency}
          onChange={(e) =>
            HandleChange({
              Key: "Frequency",
              Value: `${e.currentTarget.value}`,
            })
          }
        >
          <option value="Monthly">Monthly</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
        </select>
      </div>
      {state.modalDeatils.Frequency !== "Daily" && (
        <div>
          <label htmlFor="Repeat">Repeat</label>
          {state.modalDeatils.Frequency === "Monthly" ? (
            <select
              required
              id="Repeat"
              value={state.modalDeatils.Repeat}
              onChange={(e) =>
                HandleChange({
                  Key: "Repeat",
                  Value: `${e.currentTarget.value}`,
                })
              }
            >
              <option value="">Select Repetation</option>
              <option value="First Monday">First Monday</option>
              <option value="Last Friday">Last Friday</option>
              <option value="on 15th">on 15th</option>
            </select>
          ) : (
            <div className={styles.weeklyRepeat}>
              <input
                type="checkbox"
                id="Sunday"
                checked={state.modalDeatils.Repeat.split(" ").includes(
                  "Sunday"
                )}
                onChange={(e) =>
                  HandleChange({
                    Key: "Repeat",
                    Value: `${e.currentTarget.id}`,
                  })
                }
              />
              <label className={styles.checkBoxLabels} htmlFor="Sunday">
                S
              </label>
              <input
                type="checkbox"
                id="Monday"
                checked={state.modalDeatils.Repeat.split(" ").includes(
                  "Monday"
                )}
                onChange={(e) =>
                  HandleChange({
                    Key: "Repeat",
                    Value: `${e.currentTarget.id}`,
                  })
                }
              />
              <label className={styles.checkBoxLabels} htmlFor="Monday">
                M
              </label>
              <input
                type="checkbox"
                id="Tuesday"
                checked={state.modalDeatils.Repeat.split(" ").includes(
                  "Tuesday"
                )}
                onChange={(e) =>
                  HandleChange({
                    Key: "Repeat",
                    Value: `${e.currentTarget.id}`,
                  })
                }
              />
              <label className={styles.checkBoxLabels} htmlFor="Tuesday">
                T
              </label>
              <input
                type="checkbox"
                id="Wednesday"
                checked={state.modalDeatils.Repeat.split(" ").includes(
                  "Wednesday"
                )}
                onChange={(e) =>
                  HandleChange({
                    Key: "Repeat",
                    Value: `${e.currentTarget.id}`,
                  })
                }
              />
              <label className={styles.checkBoxLabels} htmlFor="Wednesday">
                W
              </label>
              <input
                type="checkbox"
                id="Thursday"
                checked={state.modalDeatils.Repeat.split(" ").includes(
                  "Thursday"
                )}
                onChange={(e) =>
                  HandleChange({
                    Key: "Repeat",
                    Value: `${e.currentTarget.id}`,
                  })
                }
              />
              <label className={styles.checkBoxLabels} htmlFor="Thursday">
                T
              </label>
              <input
                type="checkbox"
                id="Friday"
                checked={state.modalDeatils.Repeat.split(" ").includes(
                  "Friday"
                )}
                onChange={(e) =>
                  HandleChange({
                    Key: "Repeat",
                    Value: `${e.currentTarget.id}`,
                  })
                }
              />
              <label className={styles.checkBoxLabels} htmlFor="Friday">
                F
              </label>
              <input
                type="checkbox"
                id="Saturday"
                checked={state.modalDeatils.Repeat.split(" ").includes(
                  "Saturday"
                )}
                onChange={(e) =>
                  HandleChange({
                    Key: "Repeat",
                    Value: `${e.currentTarget.id}`,
                  })
                }
              />
              <label className={styles.checkBoxLabels} htmlFor="Saturday">
                S
              </label>
            </div>
          )}
        </div>
      )}
      <div>
        <label htmlFor="Time">Time</label>
        <input
          required
          type="time"
          id="Time"
          value={state.modalDeatils.Time}
          onChange={(e) =>
            HandleChange({
              Key: "Time",
              Value: `${e.currentTarget.value}`,
            })
          }
        />
      </div>
      <div className={styles.ButtonDiv}>
        <button onClick={() => handleClick("Cancel")}>Cancel</button>
        <button
          onClick={() =>
            handleClick(state.modalType === "Edit" ? "Update" : "Done")
          }
        >
          {state.modalType === "Edit" ? "Update" : "Done"}
        </button>
      </div>
    </div>
  );
};

export default EditAddModal;
