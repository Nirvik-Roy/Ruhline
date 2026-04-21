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
import { checkLockUnlock, getCardGameState, getlifeElements, getMotivationWords, getProgramsModule, getValuesQuestions, getWhoamIQuestions } from '../../../utils/program'
import { useNavigate, useParams } from 'react-router-dom'
import Loaders from '../../../Components/Loaders/Loaders'
import toast from 'react-hot-toast'
const LiveProgram = () => {
  const { programId, enrollmentId } = useParams();
  const navigate = useNavigate()
  const [modalIsopen, setmodalIsopen] = useState(false);
  const [moduleOpen, setmoduleOpen] = useState(true)
  const [valuesContent, setvaluesContent] = useState({})
  const [whoAmIContent, setwhoAmiIContent] = useState({})
  const [lifeElements, setLifeelements] = useState({})
  const [cardGamestate, setCardGamestate] = useState({})
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

  const MODULE_ICONS = {
    'Values': heartIcon,
    'Find your Motivation': questionIcon,
    'Who am I': userIcon,
    'Wheel of Life': wheelIcon,
    'Card Game': cardIcon
  };

  useEffect(()=>{
    if (valuesContent?.progress?.is_completed || motivationContent?.progress?.is_completed || whoAmIContent?.progress?.is_completed || lifeElements?.progress?.is_completed || cardGamestate?.navigation?.current_phase == 'completed'){
      toast.success('You have already completed this module...')
    }

  }, [valuesContent, motivationContent, whoAmIContent, lifeElements, cardGamestate])

  const MODULE_PROGRESS = {
    'Values': valuesContent?.progress?.is_completed,
    'Find your Motivation': motivationContent?.progress?.is_completed,
    'Who am I': whoAmIContent?.progress?.is_completed,
    'Wheel of Life': lifeElements?.progress?.is_completed,
    'Card Game': cardGamestate?.navigation?.current_phase == 'completed'
  };

  const tickStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '18px',
  };

  const isModuleCompleted = (module) =>
    module?.is_completed || MODULE_PROGRESS[module?.title];


  const fetchAllProgramModules = async () => {
    setloading(true)
    const res = await getProgramsModule(enrollmentId)
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
      tabsFunction(1)
    }
    setloading(false)
  }


  const fetchWhoamIQuestion = async (structureId) => {
    setloading(true)
    const res = await getWhoamIQuestions(Number(enrollmentId), structureId)
    if (res?.success) {
      setwhoAmiIContent(res?.data || {})
      tabsFunction(7)
    }
    setloading(false)
  }


  const fetchMotivation = async (structureId) => {
    setloading(true)
    const res = await getMotivationWords(Number(enrollmentId), structureId)
    if (res?.success) {
      setmotivationContent(res?.data || {})
      tabsFunction(5)
    }
    setloading(false)
  }


  const fetchWhoamIElements = async (structureId) => {
    setloading(true)
    const res = await getlifeElements(Number(enrollmentId), structureId)
    if (res?.success) {
      setLifeelements(res?.data || {})
      tabsFunction(3)
    }
    setloading(false)
  }


  const fetchCardGameState = async (structureId) => {
    setloading(true)
    const res = await getCardGameState(Number(enrollmentId), structureId)
    if (res?.success) {
      setCardGamestate(res?.data || {})
      tabsFunction(2)
    }
    setloading(false)
  }


  const fetchLockUnlockDetails = async (structureId, moduleName) => {
    setloading(true)
    const res = await checkLockUnlock(enrollmentId, structureId)
    if (res?.success) {
      if (moduleName == 'Values') {
        fetchValuesQuestion(structureId)
      }

      if (moduleName == 'Find your Motivation') {
        fetchMotivation(structureId)
      }

      if (moduleName == 'Who am I') {
        fetchWhoamIQuestion(structureId)
      }

      if (moduleName == 'Wheel of Life') {
        fetchWhoamIElements(structureId)
      }

      if (moduleName == 'Card Game') {
        fetchCardGameState(structureId)
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




  return (
    <>
      {loading && <Loaders />}
      {modalIsopen && <WaitingModal setmodalIsopen={setmodalIsopen} />}
      <div className='dashboard_content_wrapper'>
        <div className='live_program_head_wrapper'>
          <div className='live_program_head' >
            <img onClick={(()=>navigate(-1))} src={arrow}/>
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
              <div
                key={e.sort_order}
                style={e.sort_order === id ? { border: '2px solid var(--primary-color)' } : {}}
                onClick={() => {
                  fetchLockUnlockDetails(e?.program_structure_id, e?.title);
                  setId(e.sort_order);
                }}
                className='program_tab'
              >
                <img src={MODULE_ICONS[e?.title] ?? ''} alt={e?.title} />
                <p>{e.title}</p>
                {isModuleCompleted(e) && <img style={tickStyle} src={tick} alt='completed' />}
              </div>
            ))}
          </div>}

          {(tabs.values && !valuesContent?.progress?.is_completed) && <ValuesContent fetchValuesQuestion={fetchValuesQuestion} valuesContent={valuesContent} completedFunction={completedFunction} />}
          {tabs.cardGame && <CardGameContent setCardGamestate={setCardGamestate} cardGamestate={cardGamestate} completedFunction={completedFunction} />}
          {(tabs.wheel && !lifeElements?.progress?.is_completed && !lifeElements?.elements?.[0]?.question_progress?.is_completed) && <WheelLife lifeElements={lifeElements} completedFunction={completedFunction} />}
          {tabs.goal && <GoalSetting completedFunction={completedFunction} />}
          {(tabs.motivation && !motivationContent?.progress?.is_completed) && <FindMotivation fetchMotivation={fetchMotivation} motivationContent={motivationContent} completedFunction={completedFunction} />}
          {(tabs.whoAmI && !whoAmIContent?.progress?.is_completed) && <WhoAmI fetchWhoamIQuestion={fetchWhoamIQuestion} whoAmIContent={whoAmIContent} completedFunction={completedFunction} />}
          {tabs.habit && <HabitTracker completedFunction={completedFunction} />}
        </div>
      </div>
    </>
  )
}

export default LiveProgram

