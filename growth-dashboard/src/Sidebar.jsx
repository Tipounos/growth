

function Sidebar() {
    return (
        <aside className="absolute left-0 top-0 bg-bg-light-color h-full">
            <section>
                <form id="sidebar-search">
                    <input type="search" name="sidebar-search" placeholder="Rechercher" />
                </form>
                <div id="sidebar-icon">

                </div>
            </section>
        </aside>        
    )
}

export default Sidebar