'use client';
import styles from '@/styles/read.module.css';
import Panel from './publish/Panel';
import {
    CreateHook, Hook, Panel as IPanel, PanelSet
} from './interfaces';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getSessionCookie } from '@/app/login/loginUtils';
import * as apiCalls from '../api/apiCalls';
interface Props {
    setting: string,
    hook_state: string,
    panel_set: PanelSet | undefined,
    panels: IPanel[],
    currentId: number,
    router: AppRouterInstance,
    userId: string
}

const ComicPanels = ({
    setting, panel_set, hook_state, panels, router, userId
}: Props) => {
    const hidden = hook_state === 'hidden' ? true : false;
    let bodyHeight = '';
    if (setting.includes('row')) {
        bodyHeight = 'rowBodyH';
    }
    else {
        bodyHeight = 'colBodyH';
    }

    async function hookLink(hook: Hook | CreateHook) {

        // if the hook is set up, go to the next panel set
        if (hook.next_panel_set_id) {
            console.log('hook is linked');
            return router.push(`/comic?id=${hook.next_panel_set_id}`);
        }
        const session = await getSessionCookie();

        // if they are not signed in, go to the sign in page
        if (session instanceof Error || !session) {
            console.log('user is not signed in');
            return router.push(`/sign-in`);
        }
        const dbSession = await apiCalls.getSession(session?.value);
        if (dbSession instanceof Error || !dbSession) {
            console.log('user is not signed in');
            return router.push(`/sign-in`);
        }

        // if they are signed in check to see if they made the current panel set

        const user = await apiCalls.getUserBySession(session.value);

        // if they are the author, make it so they can't go to the create page
        if (panel_set?.author_id === user.id) {
            console.log('user is author');
            return router.push(`/comic?id=${panel_set?.id}`);
        }

        // otherwise, make them go to the create page
        console.log('user is not author');
        return router.push(`/comic/create?id=${(hook as Hook).id}`);
    }


    if (!panels || panels.length === 0) return <div id={`${styles.comicPanels}`} className={`${setting}`} />;

    return (
        <main className={`${styles.body} ${styles[bodyHeight]}`}>
            <div id={`${styles.comicPanels}`} className={`${setting}`}>
                <div className={`${styles.firstPanel}`}>
                    <Panel
                        imgSrc={panels[0].imgSrc}
                        hooks={panels[0].hooks}
                        onHookClick={hookLink}
                        hidden={hidden}
                        allowAnimation={true}
                        panel_set={panel_set}
                        userId={userId}
                    />
                </div>
                <div className={`${styles.secondPanel}`}>
                    <Panel
                        imgSrc={panels[1].imgSrc}
                        hooks={panels[1].hooks}
                        onHookClick={hookLink}
                        hidden={hidden}
                        allowAnimation={true}
                        panel_set={panel_set}
                        userId={userId}
                    />
                </div>
                <div className={`${styles.thirdPanel}`}>
                    <Panel
                        imgSrc={panels[2].imgSrc}
                        hooks={panels[2].hooks}
                        onHookClick={hookLink}
                        hidden={hidden}
                        allowAnimation={true}
                        panel_set={panel_set}
                        userId={userId}
                    />
                </div>
            </div>
        </main>
    );
};

export default ComicPanels;
