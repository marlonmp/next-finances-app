import React from 'react';

/**
 * This component is a form to create or update accounts
 * @param {{
 *  open: boolean = false,
 *  type: 'create' | 'update' |'retrieve' = 'create',
 *  account?: object,
 *  onClose?: () => void,
 *  onSubmit?: (account: object) => void
 * }} props
 */
export default function accountModal({ open = false, type = 'create', account, onClose, onSubmit }) {
  return (
    <>account modal</>
  );
}
