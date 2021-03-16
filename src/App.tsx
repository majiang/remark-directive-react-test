import React, { useEffect } from 'react'

import { useRemark } from 'react-remark'
import remarkDirective from 'remark-directive'

import Paper from '@material-ui/core/Paper'

import './App.css'

function App()
{
    const [reactContent, setMarkdownSource] = useRemark(
    {
        remarkPlugins:
        [
            remarkDirective,
        ],
        remarkToRehypeOptions:
        {
            handlers:
            {
                textDirective: directiveHandler,
                leafDirective: directiveHandler,
                containerDirective: directiveHandler,
            }
        },
        rehypeReactOptions:
        {
            components:
            {
                textDirective: Paper,
                leafDirective: Paper,
                containerDirective: Paper,
            }
        }
    })
    useEffect(() =>
    {
        setMarkdownSource(
        [
            '# simple (not nested) directives',
            ':test[inline content]{attr=val1}',
            '::test[leaf content]{attr=val2}',
            ':::test[inline-content]{attr=val3}',
            'content',
            ':::',
            '',
            '# nested directives',
            ':test[inline *em* content]{attr=val4}',
            '::test[leaf *strong* content]{attr=val5}',
            ':::test[inline-`code`-content]{attr=val6}',
            'content',
            ':::',
            ''
        ].join('\n'))
    }, [])
    return reactContent || <></>
}

export default App

function directiveHandler(h: any, node: any)
{
    console.log(node)
    const ret = h(node, node.type, node.attributes, node.children)
    console.log(ret)
    return ret
}
