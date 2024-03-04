import {Route, Switch} from 'wouter'
import {relativePaths} from "~/relativePaths.ts";
import {HomePage} from "~/pages/home-page/HomePage.tsx";
import React from "react";
import {WarePage} from "~/pages/ware-page/WarePage.tsx";

export const Routes: React.FC = () => {
    return (
            <Switch>
                {/*Homepage*/}
                <Route path={relativePaths.INDEX}>
                    <HomePage/>
                </Route>
                {/*Equipment*/}
                <Route path={relativePaths.EQUIPMENT}>
                    <WarePage/>
                </Route>
                {/*Cart*/}
                <Route path={relativePaths.CART}></Route>
            </Switch>
    )
}