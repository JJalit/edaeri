const menuItems = [
  {
    id: 'm_email',
    text: '메일',
    active: require('../../images/main/m_email_color.png'),
    inactive: require('../../images/main/m_email.png'),
    url: 'https://erp.edaeri.com/gw/app/email/Email.jsp',
    width: 36,
    height: 35,
  },
  {
    id: 'm_approval',
    text: '전자결재',
    active: require('../../images/main/m_approval_color.png'),
    inactive: require('../../images/main/m_approval.png'),
    url: 'https://erp.edaeri.com/gw/app/groupware/approval/Approval.jsp',
    width: 35,
    height: 34,
  },
  {
    id: 'm_schedule',
    text: '일정',
    active: require('../../images/main/m_schedule_color.png'),
    inactive: require('../../images/main/m_schedule.png'),
    url: 'https://erp.edaeri.com/gw/app/groupware/schedule/Schedule.jsp',
    width: 42,
    height: 35,
  },
  {
    id: 'm_note',
    text: '쪽지',
    active: require('../../images/main/m_note_color.png'),
    inactive: require('../../images/main/m_note.png'),
    url: 'https://erp.edaeri.com/gw/app/groupware/note/Note.jsp',
    width: 36,
    height: 35,
  },
  {
    id: 'm_task_to_do',
    text: '나의 할 일',
    active: require('../../images/main/m_task_to_do_color.png'),
    inactive: require('../../images/main/m_task_to_do.png'),
    url: 'https://erp.edaeri.com/gw/app/groupware/task/TaskTodo.jsp',
    width: 37,
    height: 37,
  },
  {
    id: 'm_task_work',
    text: '업무보고',
    active: require('../../images/main/m_task_work_color.png'),
    inactive: require('../../images/main/m_task_work.png'),
    url: 'https://erp.edaeri.com/gw/app/groupware/task/Task.jsp',
    width: 44,
    height: 39,
  },
  {
    id: 'm_board',
    text: '게시판',
    active: require('../../images/main/m_board_color.png'),
    inactive: require('../../images/main/m_board.png'),
    url: 'https://erp.edaeri.com/gw/app/groupware/board/Board.jsp',
    width: 44,
    height: 30,
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
