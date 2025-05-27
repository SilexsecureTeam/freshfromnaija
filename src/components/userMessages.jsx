// src/components/MessagePage.jsx
import { useState, useRef, useEffect } from 'react'
import AccountTabs from './AccountTabs';
import ava1 from '../assets/ava1.png';
import ava2 from '../assets/ava2.png';
import ava3 from '../assets/ava3.png';
import ava4 from '../assets/ava4.png';
import ava5 from '../assets/ava5.png';
import {
    MagnifyingGlassIcon,
    ChevronDownIcon,
    PrinterIcon,
    TrashIcon,
    EllipsisVerticalIcon,
    PaperClipIcon,
    PhotoIcon,
    FaceSmileIcon,
    MicrophoneIcon,
} from '@heroicons/react/24/outline'

// dummy data — replace these with your API fetches later
const CONTACTS = [
    {
        id: 1,
        name: "Jummy's Kitchen",
        last: 'Your orders are sent out.',
        time: '16:45',
        avatar: ava1,
    },
    {
        id: 2,
        name: "Ade's Art and Craft",
        last: 'Your orders are sent out.',
        time: '16:45',
        avatar: ava2,
    },
    {
        id: 3,
        name: 'Najja Spice Hub',
        last: 'Your orders are sent out.',
        time: '16:45',
        avatar: ava3,
    },
    {
        id: 4,
        name: 'Bold Gede Styles',
        last: 'Can i get a timeline?',
        time: '16:45',
        avatar: ava4,
    },
    {
        id: 5,
        name: 'Gele Goddess Studio',
        last: 'Can i get a timeline?',
        time: '16:45',
        avatar: ava5,
    },
    // …etc
]

const INITIAL_MESSAGES = {
    1: [
        { fromMe: false, text: 'Lorem ipsum dolor sit amet consectetur. Nisi dictum etiam tincidunt consequat nulla gravida et. Pulvinar quis cursus fringilla accumsan diam tellus tortor. Turpis turpis diam convallis libero velit posuere arcu nisi. Urna commodo egestas congue massa orci id quis.', time: '6:32 pm' },
        { fromMe: true, text: 'Turpis turpis diam convallis…', time: '6:34 pm' },
        { fromMe: false, text: 'Lorem ipsum dolor sit amet…', time: '6:38 pm' },
    ],
    2: [
        { fromMe: false, text: 'Lorem ipsum dolor sit amet consectetur. Nisi dictum etiam tincidunt consequat nulla gravida et. Pulvinar quis cursus fringilla accumsan diam tellus tortor. Turpis turpis diam convallis libero velit posuere arcu nisi. Urna commodo egestas congue massa orci id quis.', time: '6:32 pm' },
        { fromMe: false, text: 'Lorem ipsum dolor sit amet…', time: '6:38 pm' },
    ],
    3: [
        { fromMe: false, text: 'Lorem ipsum dolor sit amet consectetur. Nisi dictum etiam tincidunt consequat nulla gravida et. Pulvinar quis cursus fringilla accumsan diam tellus tortor. Turpis turpis diam convallis libero velit posuere arcu nisi. Urna commodo egestas congue massa orci id quis.', time: '6:32 pm' },
        { fromMe: true, text: 'Turpis turpis diam convallis…', time: '6:34 pm' },
        { fromMe: true, text: 'Lorem ipsum dolor sit amet…', time: '6:38 pm' },
    ],
    4: [
        { fromMe: false, text: 'Lorem ipsum dolor sit amet consectetur. Nisi dictum etiam tincidunt consequat nulla gravida et. Pulvinar quis cursus fringilla accumsan diam tellus tortor. Turpis turpis diam convallis libero velit posuere arcu nisi. Urna commodo egestas congue massa orci id quis.', time: '6:32 pm' },
        { fromMe: true, text: 'Turpis turpis diam convallis…', time: '6:34 pm' },
        { fromMe: false, text: 'Lorem ipsum dolor sit amet…', time: '6:38 pm' },
        { fromMe: true, text: 'Lorem ipsum dolor sit amet…', time: '6:38 pm' },
    ],
}

export default function MessagePageBody() {
    const [activeTab, setActiveTab] = useState('Messages');
    const [contacts, setContacts] = useState(CONTACTS)
    const [selectedId, setSelectedId] = useState(CONTACTS[0].id)
    const [msgs, setMsgs] = useState(INITIAL_MESSAGES)
    const [draft, setDraft] = useState('')
    const listRef = useRef(null)

    // auto-scroll to bottom on new message
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight
        }
    }, [msgs, selectedId])

    const handleSend = () => {
        if (!draft.trim()) return
        setMsgs((m) => ({
            ...m,
            [selectedId]: [
                ...(m[selectedId] || []),
                { fromMe: true, text: draft.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
            ],
        }))
        setDraft('')
    }

    const currentMessages = msgs[selectedId] || []

    return (
        <div className="mt-44 max-w-6xl mx-auto mb-10">
            <AccountTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="h-screen flex mt-10">
                {/* Left pane */}
                <aside className="w-80 bg-white flex flex-col">
                    <div className="p-4">
                        <h2 className="font-bold text-[20px]">Messages</h2>
                        <div className="mt-3 relative text-[#00000073]">
                            <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-3" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-9 bg-[#EEEEEE] pr-3 py-2 rounded-full focus:outline-none"
                            />
                        </div>
                        <div className="flex mt-1 text-sm text-gray-600">
                            Sort by{' '}
                            <select className="text-green-600 font-medium flex items-center">
                            <option>Vendor </option>
                            <option>Rider </option>
                            </select>
                        </div>
                    </div>

                    <ul className="overflow-auto flex-1">
                        {contacts.map((c) => (
                            <li
                                key={c.id}
                                onClick={() => setSelectedId(c.id)}
                                className={`flex items-center px-4 py-3 cursor-pointer ${c.id === selectedId ? 'bg-green-50' : 'hover:bg-gray-100'
                                    }`}
                            >
                                <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full" />
                                <div className="ml-3 flex-1">
                                    <div className="font-medium text-gray-800">{c.name}</div>
                                    <div className="text-xs text-gray-500 truncate">{c.last}</div>
                                </div>
                                <div className="text-xs text-gray-400">{c.time}</div>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Right pane */}
                <main className="flex-1 md:ml-10 flex flex-col bg-white shadow rounded-[10px]">
                    {/* Header */}
                    <header className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center !space-x-4">
                            <button onClick={() => setSelectedId(null)}>
                                {/* back arrow if needed */}
                                <ChevronDownIcon className="w-5 h-5 transform rotate-90 text-gray-600" />
                            </button>
                            <h3 className="font-semibold text-lg">
                                {contacts.find((c) => c.id === selectedId)?.name}
                            </h3>
                            <span className="px-2 py-1 border border-[#E0E0E0] text-[#F8931F] rounded-full text-xs">
                                Farm Products
                            </span>
                        </div>

                        <div className="flex items-center space-x-3 px-4 py-1.5 rounded-[7px] border border-[#E0E0E0] bg-[#FAFBFD] text-black">
                            <PrinterIcon className="w-5 h-5 cursor-pointer hover:text-gray-800" />
                            <TrashIcon className="w-5 h-5 cursor-pointer hover:text-gray-800" />
                            <EllipsisVerticalIcon className="w-5 h-5 cursor-pointer hover:text-gray-800" />
                        </div>
                    </header>

                    {/* Messages list */}
                    <div ref={listRef} className="flex-1 overflow-auto px-6 py-4 space-y-4 bg-gray-50">
                        {currentMessages.map((m, i) => (
                            <div
                                key={i}
                                className={`max-w-lg ${m.fromMe ? 'ml-auto bg-green-600 text-white' : 'mr-auto bg-white'
                                    } p-3 rounded-lg shadow`}
                            >
                                <p className="text-sm">{m.text}</p>
                                <div className="flex justify-end items-center gap-1 text-xs mt-1 text-gray-200 text-right">
                                    {m.time}
                                    <EllipsisVerticalIcon className="w-5 h-5 cursor-pointer text-gray-200" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="px-6 py-4 border-t border-[#E0E0E0] flex items-center space-x-3">
                        <MicrophoneIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
                        <input
                            type="text"
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            placeholder="Write message"
                            className="flex-1 !border border-[#E0E0E0] rounded-full px-4 py-2 focus:outline-none"
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <PaperClipIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
                        <PhotoIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
                        <button
                            onClick={handleSend}
                            className="bg-green-600 px-4 py-2 rounded-[10px] text-white font-medium"
                        >
                            Send
                        </button>
                    </div>
                </main>
            </div>
        </div>
    )
}
