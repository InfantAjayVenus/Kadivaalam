export function Home() {
    return (
        <main role="how-to-help-text" className="py-16">
            <ol role="help-text-list" className="list-inside list-decimal text-center text-3xl space-y-8">
                <li>Create a list of tasks</li>
                <li>Set a time for each task</li>
                <li>Start the session, complete the tasks and be rewarded</li>
            </ol>
            <a 
                role="link-to-session-planner" 
                href="/session-planner"
                className="flex justify-center mt-16 text-2xl font-bold"
            >
                <button tabIndex={0} className="border border-primary rounded-2xl p-6 text-center">
                    <p className="text-6xl">🧑🏼‍💻</p>
                    Start Session
                </button>
            </a>
        </main>
    )
}