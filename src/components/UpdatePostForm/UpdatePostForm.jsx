import React from "react";
import PropTypes from "prop-types";

const UpdatePostForm = ({
    post,
    editedTitle = "",
    editedBody = "",
    setEditedTitle,
    setEditedBody,
    handleUpdate,
    handleCancel,
}) => {
    const styles = {
        form: {
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "1rem",
            backgroundColor: "#f5f5f5",
            borderRadius: "4px",
        },
        input: {
            padding: "0.5rem",
            fontSize: "1rem",
        },
        textarea: {
            padding: "0.5rem",
            fontSize: "1rem",
            minHeight: "100px",
        },
        buttonGroup: {
            display: "flex",
            gap: "0.5rem",
        },
        button: {
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
        },
        saveButton: {
            backgroundColor: "#4CAF50",
            color: "white",
        },
        cancelButton: {
            backgroundColor: "#f44336",
            color: "white",
        },
    };

    return (
        <div style={styles.form}>
            <input
                style={styles.input}
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                placeholder="Post title"
            />
            <textarea
                style={styles.textarea}
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
                placeholder="Post content"
            />
            <div style={styles.buttonGroup}>
                <button
                    style={{...styles.button,...styles.saveButton }}
                    onClick={() => handleUpdate(post)}
                >
                    Update
                </button>
                <button
                    style={{...styles.button,...styles.cancelButton }}
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

UpdatePostForm.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        userId: PropTypes.number.isRequired, // userId is still required
    }).isRequired,
    editedTitle: PropTypes.string,
    editedBody: PropTypes.string,
    setEditedTitle: PropTypes.func.isRequired,
    setEditedBody: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
};

export default UpdatePostForm;