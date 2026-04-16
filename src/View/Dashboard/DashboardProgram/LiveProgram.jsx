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
import HabitTracker from './HabitTracker'
import tick from '../../../assets/Images/Layer_1.svg'
import { checkLockUnlock, getMotivationWords, getProgramsModule, getValuesQuestions, getWhoamIQuestions } from '../../../utils/program'
import { useParams } from 'react-router-dom'
import Loaders from '../../../Components/Loaders/Loaders'
import toast from 'react-hot-toast'
const LiveProgram = () => {
  const { programId, enrollmentId } = useParams();
  const [moduleOpen, setmoduleOpen] = useState(true)
  const [valuesContent, setvaluesContent] = useState({})
  const [whoAmIContent, setwhoAmiIContent] = useState({})
  const [motivationContent, setmotivationContent] = useState({})
  const [id, setId] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [loading, setloading] = useState(false)
  const [allProgramModules, setallProgramModules] = useState([])
  const [tabs, setTabs] = useState({
    values: false,
    cardGame: false,
    wheel: false,
    goal: false,
    motivation: false,
    habit: false,
    whoAmI: false,
  })

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
  }

  const fetchAllProgramModules = async () => {
    setloading(true)
    const res = await getProgramsModule(enrollmentId)
    console.log(res)
    if (res?.success) {
      setallProgramModules(res?.data?.modules || [])
    }
    setloading(false)
  }



  const fetchValuesQuestion = async (structureId) => {
    setloading(true)
    const res = await getValuesQuestions(Number(enrollmentId), structureId)
    if (res?.success) {
      setvaluesContent(res?.data || {})
    }
    setloading(false)
  }


  const fetchWhoamIQuestion = async (structureId) => {
    setloading(true)
    const res = await getWhoamIQuestions(Number(enrollmentId), structureId)
    if (res?.success) {
      setwhoAmiIContent(res?.data || {})
    }
    setloading(false)
  }


  const fetchMotivation = async (structureId) => {
    setloading(true)
    const res = await getMotivationWords(Number(enrollmentId), structureId)
    if (res?.success) {
      setmotivationContent(res?.data || {})
    }
    setloading(false)
  }



  const fetchLockUnlockDetails = async (structureId, moduleName) => {
    setloading(true)
    const res = await checkLockUnlock(enrollmentId, structureId)
    if (res?.success) {
      if (moduleName == 'Values') {
        fetchValuesQuestion(structureId)
        tabsFunction(1)
      }

      if (moduleName == 'Find your Motivation') {
        fetchMotivation(structureId)
        tabsFunction(5)
      }

      if (moduleName == 'Who am I') {
        fetchWhoamIQuestion(structureId)
        tabsFunction(7)
      }
    } else {
      toast.error('Module is not unlocked yet!')
    }
    setloading(false)
  }

  useEffect(() => {
    if (enrollmentId) {
      fetchAllProgramModules()
    }
  }, [enrollmentId])

  const completedFunction = (id) => {
    setCompleted([...completed, id])
  }


  const [modalIsopen, setmodalIsopen] = useState(false);

  return (
    <>
      {loading && <Loaders />}
      {modalIsopen && <WaitingModal setmodalIsopen={setmodalIsopen} />}
      <div className='dashboard_content_wrapper'>
        <div className='live_program_head_wrapper'>
          <div className='live_program_head' >
            <img />
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
            <div className='down_img56' src={arrow} onClick={(() => setmoduleOpen(!moduleOpen))}>
              <img src={down} />
            </div>
          </div>

          {moduleOpen && <div className='program_tabs_wrapper'>
            {(allProgramModules?.length <= 0 && !loading) && <p style={{
              textAlign: 'center',
              color: 'var(--primary-color)',
              fontWeight: '600',
              gridColumn: '1/-1'
            }}>No modules are available right now...</p>}
            {allProgramModules?.map((e) => (
              <div style={e.sort_order === id ? {
                border: '2px solid var(--primary-color)'
              } : {}} onClick={(() => {
                fetchLockUnlockDetails(e?.program_structure_id, e?.title)
                setId(e.sort_order)
              })} className='program_tab'>
                <img src={e?.title == 'Values' ? heartIcon : e?.title == 'Find your Motivation' ? questionIcon : e?.title == 'Who am I' ? userIcon : ''} />
                <p>{e.title}</p>
                {(e?.is_completed || valuesContent ?.progress?.is_completed) ? <img style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  width: '18px'
                }} src={tick} /> : (e?.is_completed || motivationContent?.progress?.is_completed) ? <img style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  width: '18px'
                  }} src={tick} /> : (e?.is_completed || whoAmIContent?.progress?.is_completed) ? <img style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  width: '18px'
                }} src={tick} /> : null}
              </div>
            ))}
          </div>}

          {tabs.values && <ValuesContent fetchValuesQuestion={fetchValuesQuestion} valuesContent={valuesContent} completedFunction={completedFunction} />}
          {tabs.cardGame && <CardGameContent completedFunction={completedFunction} />}
          {tabs.wheel && <WheelLife completedFunction={completedFunction} />}
          {tabs.goal && <GoalSetting completedFunction={completedFunction} />}
          {tabs.motivation && <FindMotivation fetchMotivation={fetchMotivation} motivationContent={motivationContent} completedFunction={completedFunction} />}
          {tabs.whoAmI && <WhoAmI fetchWhoamIQuestion={fetchWhoamIQuestion} whoAmIContent={whoAmIContent} completedFunction={completedFunction} />}
          {tabs.habit && <HabitTracker completedFunction={completedFunction} />}
        </div>
      </div>
    </>
  )
}

export default LiveProgram

