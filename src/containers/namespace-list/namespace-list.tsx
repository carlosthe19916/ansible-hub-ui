import * as React from 'react';
import './namespace-list.scss';

import { RouteComponentProps, Link } from 'react-router-dom';
import { Main, Section } from '@redhat-cloud-services/frontend-components';

import { ParamHelper } from '../../utilities/param-helper';
import {
    BaseHeader,
    NamespaceCard,
    Toolbar,
    Pagination,
} from '../../components';
import { NamespaceAPI, NamespaceListType, UserAPI } from '../../api';
import { Paths, formatPath } from '../../paths';

interface IState {
    namespaces: NamespaceListType[];
    itemCount: number;
    params: {
        name?: string;
        sort?: string;
        page?: number;
        page_size?: number;
        tenant?: string;
    };
}

interface IProps extends RouteComponentProps {
    title: string;
    namespacePath: Paths;
    filterOwner?: boolean;
}

export class NamespaceList extends React.Component<IProps, IState> {
    nonURLParams = ['tenant'];

    constructor(props) {
        super(props);

        const params = ParamHelper.parseParamString(props.location.search, [
            'page',
            'page_size',
        ]);

        if (!params['page_size']) {
            params['page_size'] = 50;
        }

        this.state = {
            namespaces: undefined,
            itemCount: 0,
            params: params,
        };
    }

    componentDidMount() {
        if (this.props.filterOwner) {
            UserAPI.getCachedUser()
                .then(result => {
                    this.setState(
                        {
                            params: {
                                ...this.state.params,
                                tenant: result.account_number,
                            },
                        },
                        () => this.loadNamespaces(),
                    );
                })
                .catch(r => console.log(r));
        } else {
            this.loadNamespaces();
        }
    }

    render() {
        const { namespaces, params, itemCount } = this.state;
        const { title, namespacePath } = this.props;
        if (!namespaces) {
            return null;
        }

        return (
            <React.Fragment>
                <BaseHeader title={title}>
                    <div className='toolbar'>
                        <Toolbar
                            params={params}
                            sortOptions={[{ title: 'Name', id: 'name' }]}
                            searchPlaceholder={'Search ' + title}
                            updateParams={p =>
                                this.updateParams(p, () =>
                                    this.loadNamespaces(),
                                )
                            }
                        />

                        <div>
                            <Pagination
                                params={params}
                                updateParams={p => this.updateParams(p)}
                                count={itemCount}
                                isTop
                            />
                        </div>
                    </div>
                </BaseHeader>
                <Main>
                    <Section className='card-layout'>
                        {namespaces.map((ns, i) => (
                            <div key={i} className='card-wrapper'>
                                <Link
                                    to={formatPath(namespacePath, {
                                        namespace: ns.name,
                                    })}
                                >
                                    <NamespaceCard
                                        key={i}
                                        {...ns}
                                    ></NamespaceCard>
                                </Link>
                            </div>
                        ))}
                    </Section>
                </Main>
            </React.Fragment>
        );
    }

    private loadNamespaces() {
        NamespaceAPI.list(this.state.params).then(results => {
            this.setState({
                namespaces: results.data.data,
                itemCount: results.data.meta.count,
            });
        });
    }

    private get updateParams() {
        return ParamHelper.updateParamsMixin(this.nonURLParams);
    }
}