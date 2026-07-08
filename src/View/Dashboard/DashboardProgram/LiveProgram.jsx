import React, { useEffect, useRef, useState } from 'react'
import './DashboardProgram.css'
import arrow from '../../../assets/Images/Vector (4).svg'
import download from '../../../assets/Images/Layer_1 (1).svg'
import video from '../../../assets/Images/Group 1597882967.png'
import down from '../../../assets/Images/Chevron.svg'
import heartIcon from '../../../assets/Images/Layer_1 (2).svg'
import cardIcon from '../../../assets/Images/Layer_1 (3).svg'
import wheelIcon from '../../../assets/Images/Capa_1 (2).svg'
import frameIcon from '../../../assets/Images/Frame.svg'
import goalIcon from '../../../assets/Images/Layer 9.svg'
import questionIcon from '../../../assets/Images/Icon (2).svg'
import habbitIcon from '../../../assets/Images/Layer_1 (4).svg'
import userIcon from '../../../assets/Images/Group 1597882969 (1).svg'
import ValuesContent from './ValuesContent'
import CardGameContent from './CardGame/CardGameContent'
import WheelLife from './WheelLife/WheelLife'
import GoalSetting from './GoalSetting.jsx'
import FindMotivation from './FindMotivation'
import WhoAmI from './WhoAmI'
import WaitingModal from './WaitingModal'
import HabitTracker from './HabitTracker'
import tick from '../../../assets/Images/Layer_1.svg'
import { checkLockUnlock, getCardGameState, getGoalSettings, getHabitTrackerState, getlifeElements, getMotivationWords, getprogramResources, getProgramsModule, getValuesQuestions, getWhoamIQuestions } from '../../../utils/program'
import { useNavigate, useParams } from 'react-router-dom'
import Loaders from '../../../Components/Loaders/Loaders'
import toast from 'react-hot-toast'
import DashboardLoader from '../../../Components/Loaders/DashboardLoader.jsx'
const LiveProgram = () => {
  const { programId, enrollmentId } = useParams();
  const navigate = useNavigate()
  const [modalIsopen, setmodalIsopen] = useState(false);
  const [moduleOpen, setmoduleOpen] = useState(true)
  const [valuesContent, setvaluesContent] = useState({})
  const [goalsettingsContent, setgoalSettingsContent] = useState({})
  const [whoAmIContent, setwhoAmiIContent] = useState({})
  const [habbitContent, sethabbitContent] = useState({})
  const [lifeElements, setLifeelements] = useState({})
  const [cardGamestate, setCardGamestate] = useState({})
  const [motivationContent, setmotivationContent] = useState({})
  const [id, setId] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [loading, setloading] = useState(false)
  const [allProgramModules, setallProgramModules] = useState([])
  const [resourcesloading, setresourcesloading] = useState(false)
  const [programResources, setprogramResources] = useState([])
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false)
  const [downloadMode, setDownloadMode] = useState('all')
  const [selectedResources, setSelectedResources] = useState([])
  const resourcesDropdownRef = useRef(null)
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
    'Card Game': cardIcon,
    'Habit Tracker': habbitIcon,
    'Goal Settings': goalIcon
  };

  // useEffect(() => {
  //   if (valuesContent?.progress?.is_completed || motivationContent?.progress?.is_completed || whoAmIContent?.progress?.is_completed || lifeElements?.progress?.is_completed || cardGamestate?.navigation?.current_phase == 'completed' || habbitContent?.progress?.is_completed) {
  //     toast.success('You have already completed this module...')
  //   }

  // }, [valuesContent, motivationContent, whoAmIContent, lifeElements, cardGamestate])

  const MODULE_PROGRESS = {
    'Values': valuesContent?.progress?.is_completed,
    'Find your Motivation': motivationContent?.progress?.is_completed,
    'Who am I': whoAmIContent?.progress?.is_completed,
    'Wheel of Life': lifeElements?.progress?.is_completed,
    'Card Game': cardGamestate?.navigation?.current_phase == 'completed',
  };

  const tickStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '18px',
  };

  const resourcesList = Array.isArray(programResources)
    ? programResources
    : programResources?.documents || programResources?.resources || []

  const getResourceName = (resource, index) =>
    resource?.document_name || resource?.name || resource?.title || resource?.file_name || `Document ${index + 1}`

  const getResourceId = (resource, index) =>
    resource?.id ?? resource?.document_id ?? index

  const toggleResourceSelection = (resourceId) => {
    setSelectedResources((prev) =>
      prev.includes(resourceId)
        ? prev.filter((id) => id !== resourceId)
        : [...prev, resourceId]
    )
  }

  const handleResourcesClickOutside = (event) => {
    if (resourcesDropdownRef.current && !resourcesDropdownRef.current.contains(event.target)) {
      setResourcesDropdownOpen(false)
    }
  }

  const fetchProgramResources = async (structureId) => {
    setresourcesloading(true)
    const res = await getprogramResources(enrollmentId, structureId)
    if (res?.success) {
      setprogramResources(res?.data || {})
    }
    setresourcesloading(false)
  }

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
      fetchProgramResources(structureId)
      tabsFunction(1)
    }
    setloading(false)
  }


  const fetchWhoamIQuestion = async (structureId) => {
    setloading(true)
    const res = await getWhoamIQuestions(Number(enrollmentId), structureId)
    if (res?.success) {
      setwhoAmiIContent(res?.data || {})
      fetchProgramResources(structureId)
      tabsFunction(7)
    }
    setloading(false)
  }


  const fetchMotivation = async (structureId) => {
    setloading(true)
    const res = await getMotivationWords(Number(enrollmentId), structureId)
    if (res?.success) {
      setmotivationContent(res?.data || {})
      fetchProgramResources(structureId)
      tabsFunction(5)
    }
    setloading(false)
  }


  const fetchWheelofLifeelements = async (structureId) => {
    setloading(true)
    const res = await getlifeElements(Number(enrollmentId), structureId)
    if (res?.success) {
      setLifeelements(res?.data || {})
      fetchProgramResources(structureId)
      tabsFunction(3)
    }
    setloading(false)
  }


  const fetchCardGameState = async (structureId) => {
    setloading(true)
    const res = await getCardGameState(Number(enrollmentId), structureId)
    if (res?.success) {
      setCardGamestate(res?.data || {})
      fetchProgramResources(structureId)
      tabsFunction(2)
    }
    setloading(false)
  }


  const fetchHabitDetaisls = async (structureId) => {
    setloading(true)
    const res = await getHabitTrackerState(Number(enrollmentId), structureId)
    if (res?.success) {
      sethabbitContent(res?.data || {})
      fetchProgramResources(structureId)
      tabsFunction(6)
    }
    setloading(false)
  }

  const fetchGoalSettings = async (structureId) => {
    setloading(true)
    const res = await getGoalSettings(Number(enrollmentId), structureId)
    if (res?.success) {
      setgoalSettingsContent(res?.data || {})
      fetchProgramResources(structureId)
      tabsFunction(4)
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
        fetchWheelofLifeelements(structureId)
      }

      if (moduleName == 'Card Game') {
        fetchCardGameState(structureId)
      }

      if (moduleName == 'Habit Tracker') {
        fetchHabitDetaisls(structureId)
      }

      if (moduleName == 'Goal Settings') {
        fetchGoalSettings(structureId)
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

  useEffect(() => {
    document.addEventListener('click', handleResourcesClickOutside)
    return () => {
      document.removeEventListener('click', handleResourcesClickOutside)
    }
  }, [])

  const completedFunction = (id) => {
    setCompleted([...completed, id])
  }


  return (
    <>

      {modalIsopen && <WaitingModal setmodalIsopen={setmodalIsopen} />}
      <div className='dashboard_content_wrapper'>
        <div className='live_program_head_wrapper'>
          <div className='live_program_head' >
            <img onClick={(() => navigate(-1))} src={arrow} />
            <h3>Program 1</h3>
          </div>
          <div
            className='download_resources_wrapper'
            ref={resourcesDropdownRef}
          >
            <div
              className={`download_resources_head ${resourcesDropdownOpen ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setResourcesDropdownOpen((prev) => !prev)
              }}
            >
              <h3>Download Resources</h3>
              <img src={download} alt='download' />
              <img
                src={down}
                alt='toggle'
                className={`download_resources_chevron ${resourcesDropdownOpen ? 'open' : ''}`}
              />
            </div>

            {resourcesDropdownOpen && (
              <div className='download_resources_dropdown'>
                <div className='download_mode_tabs'>
                  <button
                    type='button'
                    className={downloadMode === 'all' ? 'active' : ''}
                    onClick={() => setDownloadMode('all')}
                  >
                    Download All
                  </button>
                  <button
                    type='button'
                    className={downloadMode === 'selective' ? 'active' : ''}
                    onClick={() => setDownloadMode('selective')}
                  >
                    Selective Download
                  </button>
                </div>

                <div className='download_resources_list'>
                  {resourcesloading && (
                    <p className='download_resources_empty'>Loading resources...</p>
                  )}

                  {!resourcesloading && resourcesList.length <= 0 && (
                    <p className='download_resources_empty'>No resources available</p>
                  )}

                  {!resourcesloading && resourcesList.map((resource, index) => {
                    const resourceId = getResourceId(resource, index)
                    const resourceName = getResourceName(resource, index)

                    return (
                      <div key={resourceId} className='download_resource_item'>
                        {downloadMode === 'selective' && (
                          <input
                            type='checkbox'
                            checked={selectedResources.includes(resourceId)}
                            onChange={() => toggleResourceSelection(resourceId)}
                          />
                        )}
                        <span className='download_resource_name'>{resourceName}</span>
                        <button type='button' className='download_resource_btn'>
                          <img src={download} alt='download' />
                        </button>
                      </div>
                    )
                  })}
                </div>

                <div className='download_resources_footer'>
                  {downloadMode === 'all' ? (
                    <button type='button' className='download_resources_action_btn'>
                      Download All Files
                    </button>
                  ) : (
                    <button
                      type='button'
                      className='download_resources_action_btn'
                      disabled={selectedResources.length === 0}
                    >
                      Download Selected ({selectedResources.length})
                    </button>
                  )}
                </div>
              </div>
            )}
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
            {allProgramModules?.map((e) => {
              if (!e?.module_type?.startsWith('intermediate') && e?.title != 'Upload Documents') {
                return (
                  <>
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
                  </>
                )
              }
            })}
          </div>}

          {(tabs.values && !valuesContent?.progress?.is_completed) && <ValuesContent fetchValuesQuestion={fetchValuesQuestion} valuesContent={valuesContent} questionLoading={loading} completedFunction={completedFunction} />}
          {(tabs.cardGame && !loading) && <CardGameContent setCardGamestate={setCardGamestate} cardGamestate={cardGamestate} completedFunction={completedFunction} />}
          {(tabs.wheel && !lifeElements?.progress?.is_completed) && <WheelLife lifeElements={lifeElements} completedFunction={completedFunction} />}
          {tabs.goal && <GoalSetting setgoalSettingsContent={setgoalSettingsContent} goalsettingsContent={goalsettingsContent} completedFunction={completedFunction} />}
          {(tabs.motivation && !motivationContent?.progress?.is_completed) && <FindMotivation fetchMotivation={fetchMotivation} motivationContent={motivationContent} completedFunction={completedFunction} />}
          {(tabs.whoAmI && !whoAmIContent?.progress?.is_completed) && <WhoAmI questionLoading={loading} fetchWhoamIQuestion={fetchWhoamIQuestion} whoAmIContent={whoAmIContent} completedFunction={completedFunction} />}
          {tabs.habit && <HabitTracker sethabbitContent={sethabbitContent} habbitContent={habbitContent} />}

          {loading && <div style={{
            height: '20vh',
            position: 'relative'
          }}>
            <DashboardLoader />
          </div>}
        </div>
      </div>
    </>
  )
}

export default LiveProgram

