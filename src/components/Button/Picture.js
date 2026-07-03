import React, { Component } from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

import picture from "../../icons/picture.svg";

import {
  ENTER_DELAY,
  LEAVE_DELAY,
  DATA_MARKDOWN,
  DATA_ORIGIN
} from "../../utils/constant";

import { observer, inject } from "mobx-react";

@inject("navbar")
@inject("resume")
@inject("hint")
@observer
class Picture extends Component {
  uploadPicture = ({ target }) => {
    const file = target.files && target.files[0];
    if (!file) {
      return;
    }

    const id = this.props.resume.choosenKey;
    const element = document.getElementById(id);
    if (!id || !element) {
      this.props.hint.setError({
        isOpen: true,
        message: "请先选择一个简历格子"
      });
      target.value = "";
      return;
    }

    this.readImage(file)
      .then(url => {
        const { isMarkdownMode } = this.props.navbar;
        let content;
        if (isMarkdownMode) {
          content = `![avatar](${url})`;
          element.childNodes[0].innerText = content;
          element.setAttribute(DATA_MARKDOWN, content);
          this.props.resume.updateResume();
        } else {
          content = `<section><p><img src="${url}" alt="avatar"></p>\n</section>`;
          element.childNodes[0].innerHTML = content;
          element.setAttribute(DATA_ORIGIN, content);
          this.props.resume.updateNormalResume();
        }
        this.props.hint.setSuccess({
          isOpen: true,
          message: "图片已添加"
        });
      })
      .catch(() => {
        this.props.hint.setError({
          isOpen: true,
          message: "图片读取失败，请换一张图片重试"
        });
      })
      .finally(() => {
        target.value = "";
      });
  };

  readImage = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        if (!/^image\/(jpeg|jpg|png|webp)$/.test(file.type)) {
          resolve(dataUrl);
          return;
        }

        const image = new Image();
        image.onload = () => {
          const maxSize = 1000;
          const scale = Math.min(1, maxSize / image.width, maxSize / image.height);
          if (scale === 1 && file.size < 1024 * 1024) {
            resolve(dataUrl);
            return;
          }

          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(image.width * scale));
          canvas.height = Math.max(1, Math.round(image.height * scale));
          const context = canvas.getContext("2d");
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", 0.88));
        };
        image.onerror = reject;
        image.src = dataUrl;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  stopPropagation = event => {
    event.stopPropagation();
  };

  render() {
    const { classes } = this.props;

    return (
      <Tooltip
        title="图片"
        placement="bottom"
        enterDelay={ENTER_DELAY}
        leaveDelay={LEAVE_DELAY}
        disableFocusListener
      >
        <Button
          className={classes.btn}
          disabled={this.props.navbar.isDisabled}
          onClick={this.stopPropagation}
          classes={{
            root: classes.minWidth,
            disabled: classes.opacity
          }}
        >
          <input
            accept="image/*"
            className={classes.input}
            id="uploadImage"
            onChange={this.uploadPicture}
            type="file"
          />
          <label htmlFor="uploadImage" className={classes.label}>
            <img src={picture} alt="logo" />
          </label>
        </Button>
      </Tooltip>
    );
  }
}

const styles = theme => ({
  input: {
    display: "none",
    width: "100%"
  },
  label: {
    display: "flex",
    height: "100%",
    padding: "6px 10px"
  },
  btn: {
    padding: "0px",
    borderRadius: "0",
    borderBottom: "1px solid #cccccc",
    borderTop: "1px solid #cccccc",
    borderRight: "1px solid #cccccc",
    height: "100%"
  },
  minWidth: {
    minWidth: "auto"
  },
  opacity: {
    opacity: 0.3
  }
});

Picture.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Picture);
