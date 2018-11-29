import React from "react"
import { MdClose as CloseIcon } from "react-icons/md"

import styles from "./ConfirmationModal.scss"
import { Button, Modal, Paper } from ".."

interface Props {
  cancelText?: string
  confirmText?: string
  text: string
  onCancel: (e: React.MouseEvent) => void
  onClose?: (e: React.MouseEvent) => void
  onConfirm: (e: React.MouseEvent) => void
}

const ConfirmationModal: React.SFC<Props> = props => {
  const { cancelText, confirmText, onCancel, onClose, onConfirm, text } = props
  return (
    <Modal>
      <Paper elevation={4} className={styles.container}>
        {onClose && <CloseIcon className={styles.close} onClick={onClose} />}
        <div className={styles.content}>
          <p className={styles.text}>{text}</p>
        </div>
        <div className={styles.actions}>
          <Button
            className={styles.confirm}
            text={confirmText}
            onClick={onConfirm}
          />
          <Button
            className={styles.cancel}
            text={cancelText}
            onClick={onCancel}
          />
        </div>
      </Paper>
    </Modal>
  )
}

ConfirmationModal.defaultProps = {
  cancelText: "Cancel",
  confirmText: "Accept"
}

export default ConfirmationModal
