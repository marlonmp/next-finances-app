import { useForm } from '@mantine/form';
import { Modal, Button, Box, TextInput, Select } from '@mantine/core';
import { IconCircleX, IconId, IconPig, IconSend2, IconWallet } from '@tabler/icons-react';

const initialAccountValues = { name: '', type: null };

const accountTypes = [
  { value: 'savings', label: 'Savings' },
  { value: 'credit', label: 'Credit' },
];

/**
 * This component is a form to create or update accounts
 * @param {{
 *  opened: boolean = false,
 *  type: 'create' | 'update' |'retrieve' = 'create',
 *  account?: object,
 *  onClose?: () => void,
 *  onSubmit?: (account: object) => void
 * }} props
 */
export default function AccountModal({ opened = false, type = 'create', account, onClose, onSubmit }) {
  const title = (
    <div className='flex flex-row flex-nowrap items-center gap-x-2'>
      <IconWallet />
      <div>Create account</div>
    </div>
  );

  const form = useForm({
    initialValues: { ...(account || initialAccountValues) },
  });

  return (
    <>
      <Modal centered opened={opened} onClose={onClose} title={title}>
        <Box max={340}>
          <form onSubmit={onSubmit} className='flex flex-col gap-y-4'>
            <TextInput withAsterisk required label='Name' placeholder='Bancolombia' leftSection={<IconId size={14} />}
              {...form.getInputProps('name')} />

            <Select withAsterisk required clearable label='Type' placeholder='Savings'
              leftSection={<IconPig size={14} />} data={accountTypes} {...form.getInputProps('type')} />

            <div className='w-full flex flex-row flex-nowrap items-center gap-x-2 mt-3'>

              <Button type='submit' color='green' leftSection={<IconSend2 />}>Submit</Button>

              <Button color='red' leftSection={<IconCircleX />} onClick={onClose}>Cancel</Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
