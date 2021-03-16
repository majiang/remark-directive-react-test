import React, { useEffect } from 'react'

import { useRemark } from 'react-remark'
import remarkDirective from 'remark-directive'

import './App.css'

function App()
{
    const [reactContent, setMarkdownSource] = useRemark(
    {
        remarkPlugins:
        [
            remarkDirective,
        ],
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
