import React, { useEffect, useState } from 'react'
import arrow from '../../../assets/Images/Vector (4).svg'
import download from '../../../assets/Images/Layer_1 (1).svg'
import video from '../../../assets/Images/Group 1597882967.png'
import down from '../../../assets/Images/Chevron.svg'
import heartIcon from '../../../assets/Images/Layer_1 (2).svg'
import cardIcon from '../../../assets/Images/Layer_1 (3).svg'
import wheelIcon from '../../../assets/Images/Capa_1 (2).svg'
import frameIcon from '../../../assets/Images/Frame.svg'
import questionIcon from '../../../assets/Images/Icon (2).svg'
import habbitIcon from '../../../assets/Images/Layer_1 (4).svg'
import userIcon from '../../../assets/Images/Group 1597882969 (1).svg'
import ValuesContent from './ValuesContent'
import CardGameContent from './CardGame/CardGameContent'
import WheelLife from './WheelLife/WheelLife'
import GoalSetting from './GoalSetting'
import FindMotivation from './FindMotivation'
import WhoAmI from './WhoAmI'
import WaitingModal from './WaitingModal'
const LiveProgram = () => {
  const [id, setId] = useState();
  const [completed, setCompleted] = useState([])
  const [tabs, setTabs] = useState({
    values: false,
    cardGame: false,
    wheel: false,
    goal: false,
    motivation: false,
    habit: false,
    whoAmI: false,
  })

  const completedFunction = (id) => {
    setCompleted([...completed, id])
  }

  const tabsFunction = (id) => {
    setTabs({
      values: id == 1 ? true : false,
      cardGame: id == 2 ? true : false,
      wheel: id == 3 ? true : false,
      goal: id == 4 ? true : false,
      motivation: id == 5 ? true : false,
      habit: id == 6 ? true : false,
      whoAmI: id == 7 ? true : false,
    })
    setId(id)
  }

  const [modalIsopen, setmodalIsopen] = useState(false);

  const programModules = [
    {
      id: 1,
      icon: heartIcon,
      title: 'Values',
    },
    {
      id: 2,
      icon: cardIcon,
      title: 'Card Game'
    },
    {
      id: 3,
      icon: wheelIcon,
      title: 'Wheel of Life'
    },
    {
      id: 4,
      icon: frameIcon,
      title: 'Goal Settings'
    },
    {
      id: 5,
      icon: questionIcon,
      title: 'Find your Motivation'
    },
    {
      id: 6,
      icon: habbitIcon,
      title: 'Habit Tracker'
    },
    {
      id: 7,
      icon: userIcon,
      title: 'Who am I?'
    },
  ]
  return (
    <>
      {modalIsopen && <WaitingModal setmodalIsopen={setmodalIsopen} />}
      <div className='dashboard_content_wrapper'>
        <div className='live_program_head_wrapper'>
          <div className='live_program_head'>
            <img src={arrow} />
            <h3>Program 1</h3>
          </div>
          <div className='download_resources_head'>
            <h3>Download Resources</h3>
            <img src={download} />
          </div>
        </div>

        <div className='live_program_video_wrapper'>
          <img src={video} />
        </div>

        <div className='live_program_modules_wrapper'>
          <div className='live_program_modules_head'>
            <h4>Program Modules</h4>
            <div className='down_img56'>
              <img src={down} />
            </div>
          </div>

          <div className='program_tabs_wrapper'>
            {programModules.map((e, i) => (
              <div style={e.id === id ? {
                border: '2px solid var(--primary-color)'
              } : {}} onClick={(() => {
                tabsFunction(e.id)
              })} className='program_tab'>
                <img src={e.icon} />
                <p>{e.title}</p>
                {completed.includes(e.id) && <span style={{
                  fontSize: '10px',
                  fontWeight: '500',
                  color: '#fff',
                  background: 'rgba(36, 159, 50, 1)',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  textAlign: 'center',
                  marginInline: 'auto',
                }}>Completed</span>}
              </div>
            ))}
          </div>

          {tabs.values && <ValuesContent completedFunction={completedFunction} />}
          {tabs.cardGame && <CardGameContent completedFunction={completedFunction} />}
          {tabs.wheel && <WheelLife completedFunction={completedFunction} />}
          {tabs.goal && <GoalSetting completedFunction={completedFunction} />}
          {tabs.motivation && <FindMotivation completedFunction={completedFunction} />}
          {tabs.whoAmI && <WhoAmI completedFunction={completedFunction} />}
        </div>
      </div>
    </>
  )
}

export default LiveProgram

