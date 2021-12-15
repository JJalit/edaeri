const menuItems = [
  {
    id: 'm_email',
    active: require('../../images/main/m_email_color.png'),
    inactive: require('../../images/main/m_email.png'),
  },
  {
    id: 'm_approval',
    active: require('../../images/main/m_approval_color.png'),
    inactive: require('../../images/main/m_approval.png'),
  },
  {
    id: 'm_schedule',
    active: require('../../images/main/m_schedule_color.png'),
    inactive: require('../../images/main/m_schedule.png'),
  },
  {
    id: 'm_note',
    active: require('../../images/main/m_note_color.png'),
    inactive: require('../../images/main/m_note.png'),
  },
  {
    id: 'm_task_to_do',
    active: require('../../images/main/m_task_to_do_color.png'),
    inactive: require('../../images/main/m_task_to_do.png'),
  },
  {
    id: 'm_task_work',
    active: require('../../images/main/m_task_work_color.png'),
    inactive: require('../../images/main/m_task_work.png'),
  },
  {
    id: 'm_email',
    active: require('../../images/main/m_note_color.png'),
    inactive: require('../../images/main/m_note.png'),
  },
  {
    id: 'm_email',
    active: require('../../images/main/m_task_to_do_color.png'),
    inactive: require('../../images/main/m_task_to_do.png'),
  },
];

const inputItems = [
  {
    id: 0,
    name: 'companyCode',
    placeholder: '회사코드',
    errorText: '회사코드를 확인해 주세요.',
  },
  {
    id: 1,
    name: 'id',
    placeholder: '아이디',
    errorText: '아이디를 확인해 주세요.',
  },
  {
    id: 2,
    name: 'password',
    placeholder: '비밀번호',
    errorText: '비밀번호를 확인해 주세요.',
  },
];

export default { menuItems, inputItems };
