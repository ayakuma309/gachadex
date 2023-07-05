import React from "react"
import Header from "./Header"

type MyComponentProps = {
  children: React.ReactNode
}
//Layoutコンポーネントの作成。全体のlayout。引数にchildren, title
const Layout: React.FC<MyComponentProps> = ({
  children,
}) => {
  return (
    <>
      <div>
        <Header />
        <main>
          <div>
            <div>
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
export default Layout
