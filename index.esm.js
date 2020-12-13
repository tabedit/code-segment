function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var createOutlineDictFactory_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOutlineDictFactory = void 0;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createOutlineDictFactory(_) {
    const { PDFDict, PDFName } = _;
    return function createOutlineDict(doc, _) {
        const outlinesDictMap = new Map();
        outlinesDictMap.set(PDFName.Type, PDFName.of("Outlines"));
        outlinesDictMap.set(PDFName.of("First"), _.First);
        outlinesDictMap.set(PDFName.of("Last"), _.Last);
        outlinesDictMap.set(PDFName.of("Count"), _.Count);
        return PDFDict.fromMapWithContext(outlinesDictMap, doc.context);
    };
}
exports.createOutlineDictFactory = createOutlineDictFactory;
});

unwrapExports(createOutlineDictFactory_1);
var createOutlineDictFactory_2 = createOutlineDictFactory_1.createOutlineDictFactory;

var createOutlineNodeFactory_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOutlineNodeFactory = void 0;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createOutlineNodeFactory(_) {
    const { PDFDict, PDFName } = _;
    return function createOutlineNode(doc, _) {
        const map = new Map();
        map.set(PDFName.Title, _.Title);
        map.set(PDFName.Parent, _.Parent);
        if (_.Prev !== undefined)
            map.set(PDFName.of("Prev"), _.Prev);
        if (_.Next !== undefined)
            map.set(PDFName.of("Next"), _.Next);
        if (_.First !== undefined)
            map.set(PDFName.of("First"), _.First);
        if (_.Last !== undefined)
            map.set(PDFName.of("Last"), _.Last);
        if (_.Count !== undefined)
            map.set(PDFName.of("Count"), _.Count);
        map.set(PDFName.of("Dest"), _.Dest);
        return PDFDict.fromMapWithContext(map, doc.context);
    };
}
exports.createOutlineNodeFactory = createOutlineNodeFactory;
});

unwrapExports(createOutlineNodeFactory_1);
var createOutlineNodeFactory_2 = createOutlineNodeFactory_1.createOutlineNodeFactory;

var getPageRefsFactory_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageRefsFactory = void 0;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getPageRefsFactory(_) {
    const { PDFPageLeaf } = _;
    return function getPageRefs(pdfDoc) {
        const refs = [];
        pdfDoc.catalog.Pages().traverse((kid, ref) => {
            if (kid instanceof PDFPageLeaf)
                refs.push(ref);
        });
        return refs;
    };
}
exports.getPageRefsFactory = getPageRefsFactory;
});

unwrapExports(getPageRefsFactory_1);
var getPageRefsFactory_2 = getPageRefsFactory_1.getPageRefsFactory;

var hasChild_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasChild = void 0;
/**
 * @description Returns a predicate on whether the provided outline node has a child.
*/
function hasChild(outline, i) {
    if (i === outline.length - 1)
        return false;
    return outline[i].depth + 1 === outline[i + 1].depth;
}
exports.hasChild = hasChild;
});

unwrapExports(hasChild_1);
var hasChild_2 = hasChild_1.hasChild;

var getIndexOfImmediateLastChild = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports._errorMessages = exports.getIndexOfLastImmediateChild = void 0;
/**
 * @description Returns the index of the last immediate child for the provided outline node.
 * It throws if there is no child.
 */
function getIndexOfLastImmediateChild(outline, i) {
    let candidateIndex;
    const parentDepth = outline[i].depth;
    for (let ii = i + 1; ii < outline.length; ii++) {
        if (outline[ii].depth <= parentDepth)
            break;
        if (outline[ii].depth === parentDepth + 1)
            candidateIndex = ii;
    }
    if (candidateIndex === undefined)
        throw Error(exports._errorMessages.thereIsNoLastImmediateChildForTheGivenIndex(i));
    return candidateIndex;
}
exports.getIndexOfLastImmediateChild = getIndexOfLastImmediateChild;
exports._errorMessages = {
    thereIsNoLastImmediateChildForTheGivenIndex: (i) => `
		There is no last immediate child for the given index : ${i}.
	`.trim(),
};
});

unwrapExports(getIndexOfImmediateLastChild);
var getIndexOfImmediateLastChild_1 = getIndexOfImmediateLastChild._errorMessages;
var getIndexOfImmediateLastChild_2 = getIndexOfImmediateLastChild.getIndexOfLastImmediateChild;

var getIndexOfImmediateNextSibling_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports._errorMessages = exports.getIndexOfImmediateNextSibling = void 0;
/**
 * @description It returns the index of the immediate next sibling for the specified outline node.
 * It throws if it does not exist.
 */
function getIndexOfImmediateNextSibling(outline, i) {
    const contextDepth = outline[i].depth;
    for (let ii = i + 1; ii < outline.length; ii++) {
        if (outline[ii].depth < contextDepth)
            break;
        if (outline[ii].depth === contextDepth)
            return ii;
    }
    throw Error(exports._errorMessages.noImmediateNextSiblingForTheGivenIndex(i));
}
exports.getIndexOfImmediateNextSibling = getIndexOfImmediateNextSibling;
exports._errorMessages = {
    noImmediateNextSiblingForTheGivenIndex: (i) => `
		No immediate next sibling for the index ${i}.
	`.trim(),
};
});

unwrapExports(getIndexOfImmediateNextSibling_1);
var getIndexOfImmediateNextSibling_2 = getIndexOfImmediateNextSibling_1._errorMessages;
var getIndexOfImmediateNextSibling_3 = getIndexOfImmediateNextSibling_1.getIndexOfImmediateNextSibling;

var getIndexOfImmediatePreviousSibling_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports._errorMessages = exports.getIndexOfImmediatePreviousSibling = void 0;
/**
 * @description It returns the index of the immediate previous sibling for the provided outline node,
 * or throws if it does not find one.
 */
function getIndexOfImmediatePreviousSibling(outline, i) {
    const contextDepth = outline[i].depth;
    for (let ii = i - 1; ii > -1; ii--) {
        if (outline[ii].depth < contextDepth)
            break;
        if (outline[ii].depth === contextDepth)
            return ii;
    }
    throw Error(exports._errorMessages.thereIsNoImmediatePreviousSibling(i));
}
exports.getIndexOfImmediatePreviousSibling = getIndexOfImmediatePreviousSibling;
exports._errorMessages = {
    thereIsNoImmediatePreviousSibling: (i) => `
		There is no immediate previous sibling for the node with index ${i}.
	`.trim(),
};
});

unwrapExports(getIndexOfImmediatePreviousSibling_1);
var getIndexOfImmediatePreviousSibling_2 = getIndexOfImmediatePreviousSibling_1._errorMessages;
var getIndexOfImmediatePreviousSibling_3 = getIndexOfImmediatePreviousSibling_1.getIndexOfImmediatePreviousSibling;

var hasImmediatePreviousSibling_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasImmediatePreviousSibling = void 0;

/**
 * @description It returns a predicate on whether the provided outline node has an immediate previous sibling.
 */
function hasImmediatePreviousSibling(outline, i) {
    try {
        getIndexOfImmediatePreviousSibling_1.getIndexOfImmediatePreviousSibling(outline, i);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.hasImmediatePreviousSibling = hasImmediatePreviousSibling;
});

unwrapExports(hasImmediatePreviousSibling_1);
var hasImmediatePreviousSibling_2 = hasImmediatePreviousSibling_1.hasImmediatePreviousSibling;

var hasImmediateNextSibling_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasImmediateNextSibling = void 0;

/**
 * @description It returns a predicate on whether the provided outline node has an immediate next sibling.
 */
function hasImmediateNextSibling(outline, i) {
    try {
        getIndexOfImmediateNextSibling_1.getIndexOfImmediateNextSibling(outline, i);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.hasImmediateNextSibling = hasImmediateNextSibling;
});

unwrapExports(hasImmediateNextSibling_1);
var hasImmediateNextSibling_2 = hasImmediateNextSibling_1.hasImmediateNextSibling;

var getIndexOfImmediateParentFactory_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndexOfImmediateParentFactory = void 0;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getIndexOfImmediateParentFactory(v) {
    /**
     * @description It returns the index of the parent of the provided outline node.
     * It returns the PDFRef of the pdf outline root object when the provided outline node has zero depth.
    */
    function getIndexOfParent(outline, i) {
        const contextDepth = outline[i].depth;
        for (let ii = i; ii > -1; ii--) {
            if (contextDepth - 1 === outline[ii].depth)
                return ii;
        }
        return v;
    }
    return getIndexOfParent;
}
exports.getIndexOfImmediateParentFactory = getIndexOfImmediateParentFactory;
});

unwrapExports(getIndexOfImmediateParentFactory_1);
var getIndexOfImmediateParentFactory_2 = getIndexOfImmediateParentFactory_1.getIndexOfImmediateParentFactory;

var getIndexesOfImmediateChildren_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndexesOfImmediateChildren = void 0;
/**
 * @description Returns the indexes that correspond to the immediate children of the specified outline node.
 * You can provide `i` as `-1` to get the indexes of all the `0` depth siblings.
 */
function getIndexesOfImmediateChildren(outline, i) {
    const toReturn = [];
    const initialDepth = i === -1 ? -1 : outline[i].depth;
    for (let ii = i + 1; ii < outline.length; ii++) {
        if (outline[ii].depth === initialDepth + 1)
            toReturn.push(ii);
        if (outline[ii].depth <= initialDepth)
            break;
    }
    return toReturn;
}
exports.getIndexesOfImmediateChildren = getIndexesOfImmediateChildren;
});

unwrapExports(getIndexesOfImmediateChildren_1);
var getIndexesOfImmediateChildren_2 = getIndexesOfImmediateChildren_1.getIndexesOfImmediateChildren;

var calculateCount_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCount = void 0;


/**
 * @description Mutates in place the provided outline subtree by adding count to each node that has each count undefined.
 * It returns the count of the root of the subtree.
 * Take notice that nodes that have no children have count 1 (something that is not valid according to pdf documentation).
 * Nodes that are collapsed have negative count (as pdf documentation dictates).
 * For `i` being `-1` it calculates the count for all outline and
 * returns the count to be added to the parent pdf object of outline.
 */
function calculateCount(outline, i) {
    if (i > 0) {
        const { count } = outline[i];
        if ( /*count is already calculated return it*/typeof count === "number")
            return count;
        //else calculate it and return it
    }
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    let contextCount = 0;
    for (const ii of getIndexesOfImmediateChildren_1.getIndexesOfImmediateChildren(outline, i)) {
        const currentIndexCount = calculateCount(outline, ii);
        if (currentIndexCount < 0) {
            contextCount++;
        }
        else {
            contextCount = contextCount + currentIndexCount + (hasChild_1.hasChild(outline, ii) ? 1 : 0);
        }
    }
    if (i === -1) {
        return contextCount;
    }
    else if ( /*node that has no children*/contextCount === 0) {
        return (outline[i].count = 1);
    }
    else if (outline[i].collapse) {
        return (outline[i].count = -1 * contextCount);
    } /* (!outline[i].collapse)*/
    else {
        return (outline[i].count = contextCount);
    }
}
exports.calculateCount = calculateCount;
});

unwrapExports(calculateCount_1);
var calculateCount_2 = calculateCount_1.calculateCount;

var pseudoOutline_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.pseudoOutline = void 0;








/**
 * @description It returns the information to "hydrate" outline.
*/
function pseudoOutline(outline, parent) {
    const outlineItems = [];
    const getIndexOfImmediateParent = getIndexOfImmediateParentFactory_1.getIndexOfImmediateParentFactory(parent);
    const outlineRootCount = calculateCount_1.calculateCount(outline, -1);
    for (let i = 0; i < outline.length; i++) {
        outlineItems[i] = {
            Title: outline[i].title,
            Parent: getIndexOfImmediateParent(outline, i),
            ...(hasImmediatePreviousSibling_1.hasImmediatePreviousSibling(outline, i) && {
                Prev: getIndexOfImmediatePreviousSibling_1.getIndexOfImmediatePreviousSibling(outline, i),
            }),
            ...(hasImmediateNextSibling_1.hasImmediateNextSibling(outline, i) && {
                Next: getIndexOfImmediateNextSibling_1.getIndexOfImmediateNextSibling(outline, i),
            }),
            ...(hasChild_1.hasChild(outline, i) && {
                First: i + 1,
                Last: getIndexOfImmediateLastChild.getIndexOfLastImmediateChild(outline, i),
                Count: outline[i].count,
            }),
            Dest: outline[i].pageNumber - 1,
        };
    }
    return {
        outlineItems: outlineItems,
        outlineRootCount: outlineRootCount,
    };
}
exports.pseudoOutline = pseudoOutline;
});

unwrapExports(pseudoOutline_1);
var pseudoOutline_2 = pseudoOutline_1.pseudoOutline;

var printedToOutline_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports._errorMessages = exports.printedToOutline = void 0;
/**
 * @description Converts the outline string representation to its programmatic representation.
 * It throws if the outline string representation is not valid.
 * @example
 * //input
 * printedToOutline(`
 * 	 1||Document
 * 	 2|-|Section 1
 * 	-3|-|Section 2
 * 	 4|--|Subsection 1
 * 	 5|-|Section 3
 * 	 6||Summary
 * `,6)
 * //output
 * [
 * 	{ pageNumber: 1, depth: 0, title: "Document" , collapse : false , line : "1||Document"},
 * 	{ pageNumber: 2, depth: 1, title: "Section 1" , collapse : false , line : "2|-|Section 1"},
 * 	{ pageNumber: 3, depth: 1, title: "Section 2" , collapse : true , line : "-3|-|Section 2"},
 * 	{ pageNumber: 4, depth: 2, title: "Subsection 1" , collapse : false , line : "4|--|Subsection 1"},
 * 	{ pageNumber: 5, depth: 1, title: "Section 3" , collapse : false , line : "5|-|Section 3"},
 * 	{ pageNumber: 6, depth: 0, title: "Summary" , collapse : false , line : "6||Summary"},
 * ]
 */
function printedToOutline(inputOutline, totalNumberOfPages) {
    if (inputOutline.trim() === "")
        throw Error(exports._errorMessages.emptyOutline);
    let lastNode;
    const toReturn = inputOutline
        .trim()
        .split("\n")
        .map((untrimmedLine, i) => {
        const line = untrimmedLine.trim();
        // eslint-disable-next-line no-useless-escape
        const match = line.match(/^([+\-]?\d+)\|(-*)\|(.*)$/);
        if (match === null)
            throw Error(exports._errorMessages.wrongPatternInLine(line));
        const nodeToReturn = {
            pageNumber: Math.abs(Number(match[1])),
            depth: match[2].length,
            title: match[3],
            collapse: Number(match[1]) < 0,
            line: line,
        };
        if (nodeToReturn.pageNumber === 0)
            throw Error(exports._errorMessages.zeroPageInOutlineIsNotAllowed(line));
        if (nodeToReturn.pageNumber > totalNumberOfPages)
            throw Error(exports._errorMessages.pageNumberInOutlineExceedsMaximum(line, totalNumberOfPages));
        if (i === 0 && nodeToReturn.depth !== 0)
            throw Error(exports._errorMessages.depthOfOutlineHasToStartWithZero);
        if (i !== 0) {
            if (!(nodeToReturn.depth <= lastNode.depth + 1)) {
                throw Error(exports._errorMessages.wrongDepthDisplacement(lastNode.line, nodeToReturn.line));
            }
            if (nodeToReturn.pageNumber < lastNode.pageNumber) {
                throw Error(exports._errorMessages.invalidDisplacementOfPage(lastNode.line, nodeToReturn.line));
            }
            if (lastNode.collapse && lastNode.depth >= nodeToReturn.depth) {
                throw Error(exports._errorMessages.nodeIsCollapsedWithoutChildren(lastNode.line));
            }
        }
        lastNode = nodeToReturn;
        return nodeToReturn;
    });
    return toReturn;
}
exports.printedToOutline = printedToOutline;
exports._errorMessages = {
    emptyOutline: "no outline has been provided",
    wrongDepthDisplacement: (oldLine, newLine) => `
Wrong depth displacement for the following part of the outline :
${oldLine}
${newLine}
`.trim(),
    zeroPageInOutlineIsNotAllowed: (line) => `Zero page number is not allowed in outline : ${line}`,
    pageNumberInOutlineExceedsMaximum: (line, max) => `Pdf file has ${max} number of pages and outline points out of this range : ${line}`,
    depthOfOutlineHasToStartWithZero: `The outline should start with zero depth.`,
    wrongPatternInLine: (line) => `The line "${line}" has wrong pattern.`,
    invalidDisplacementOfPage: (oldLine, newLine) => `
	The page is not displaced correctly :
	${oldLine}
	${newLine}
`.trim(),
    nodeIsCollapsedWithoutChildren: (line) => `Outline node : "${line}" has no children and it is collapsed. You have to un collapse it or add children.`,
};
});

unwrapExports(printedToOutline_1);
var printedToOutline_2 = printedToOutline_1._errorMessages;
var printedToOutline_3 = printedToOutline_1.printedToOutline;

var outlinePdfFactory_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports._errorMessages = exports.outlinePdfFactory = void 0;





function outlinePdfFactory(_) {
    const { PDFArray, PDFDocument, PDFName, PDFNull, PDFNumber, PDFString } = _;
    const getPageRefs = getPageRefsFactory_1.getPageRefsFactory(_);
    const createOutlineNode = createOutlineNodeFactory_1.createOutlineNodeFactory(_);
    const createOutlineDict = createOutlineDictFactory_1.createOutlineDictFactory(_);
    return {
        async savePdf(...args) {
            const { _pdfDocument } = this;
            if (_pdfDocument === undefined)
                throw Error(exports._errorMessages.thereIsNoPdfToSave);
            return _pdfDocument.save(...args);
        },
        async loadPdf(...args) {
            this._pdfDocument = await PDFDocument.load(...args);
            return this._pdfDocument;
        },
        set outline(s) {
            this._outline = s;
        },
        get outline() {
            const { _outline } = this;
            if (_outline === undefined)
                throw Error(exports._errorMessages.thereIsNoOutlineToGet);
            return _outline;
        },
        applyOutlineToPdf() {
            const { outline: inputOutline, _pdfDocument: doc } = this;
            if (doc === undefined)
                throw Error(exports._errorMessages.thereIsNoPdfToAddOutline);
            // const { outline: inputOutline, pdf: doc } = _;
            const pageRefs = getPageRefs(doc);
            const outline = printedToOutline_1.printedToOutline(inputOutline, pageRefs.length);
            const outlinesDictRef = doc.context.nextRef();
            //Pointing the "Outlines" property of the PDF "Catalog" to the first object of your outlines
            doc.catalog.set(PDFName.of("Outlines"), outlinesDictRef);
            const outlineItemRef = [];
            const outlineItem = [];
            outline.forEach(() => {
                outlineItemRef.push(doc.context.nextRef());
            });
            const currentParentRef = outlinesDictRef;
            const { outlineItems: pseudoOutlineItems, outlineRootCount } = pseudoOutline_1.pseudoOutline(outline, currentParentRef);
            for (let i = 0; i < outline.length; i++) {
                const { Title, Dest, Parent, Count, First, Last, Next, Prev } = pseudoOutlineItems[i];
                outlineItem[i] = createOutlineNode(doc, {
                    Title: PDFString.of(Title),
                    Parent: typeof Parent === "number" ? outlineItemRef[Parent] : Parent,
                    ...(Prev !== undefined && {
                        Prev: outlineItemRef[Prev],
                    }),
                    ...(Next !== undefined && {
                        Next: outlineItemRef[Next],
                    }),
                    ...(First !== undefined && { First: outlineItemRef[First] }),
                    ...(Last !== undefined && { Last: outlineItemRef[Last] }),
                    ...(Count !== undefined && { Count: PDFNumber.of(Count) }),
                    Dest: (() => {
                        const array = PDFArray.withContext(doc.context);
                        array.push(pageRefs[Dest]);
                        array.push(PDFName.of("XYZ"));
                        array.push(PDFNull);
                        array.push(PDFNull);
                        array.push(PDFNull);
                        return array;
                    })(),
                });
            }
            const outlinesDict = createOutlineDict(doc, {
                // /Type /Outline  ???
                First: outlineItemRef[0],
                Last: outlineItemRef[outline.length - 1],
                Count: PDFNumber.of(outlineRootCount),
            });
            //First 'Outline' object. Refer to table H.3 in Annex H.6 of PDF Specification doc.
            doc.context.assign(outlinesDictRef, outlinesDict);
            //Actual outline items that will be displayed
            outline.forEach((_l, i) => {
                doc.context.assign(outlineItemRef[i], outlineItem[i]);
            });
        },
    };
}
exports.outlinePdfFactory = outlinePdfFactory;
exports._errorMessages = {
    thereIsNoPdfToSave: "There is no pdf to save.",
    thereIsNoOutlineToGet: "There is not outline to get.",
    thereIsNoPdfToAddOutline: "There is no pdf to add outline."
};
});

unwrapExports(outlinePdfFactory_1);
var outlinePdfFactory_2 = outlinePdfFactory_1._errorMessages;
var outlinePdfFactory_3 = outlinePdfFactory_1.outlinePdfFactory;

var rejectIfPathExistsFactory_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports._errorMessages = exports.rejectIfPathExistsFactory = void 0;
/**
 * @description It returns a rejected promise if the provided path corresponds to a file or directory,
 * otherwise it returns a void fulfilled promise.
 */
function rejectIfPathExistsFactory(fs) {
    return async function rejectIfPathExists(path) {
        const pathExist = await fs.promises
            .access(path)
            .then(() => true)
            .catch(() => false);
        if (pathExist)
            throw Error(exports._errorMessages.pathExist(path));
        else
            return undefined;
    };
}
exports.rejectIfPathExistsFactory = rejectIfPathExistsFactory;
exports._errorMessages = {
    pathExist: (path) => `
	    	The is already a file or directory for the provided path "${path}".
	    `.trim(),
};
});

unwrapExports(rejectIfPathExistsFactory_1);
var rejectIfPathExistsFactory_2 = rejectIfPathExistsFactory_1._errorMessages;
var rejectIfPathExistsFactory_3 = rejectIfPathExistsFactory_1.rejectIfPathExistsFactory;

var throwIfPathDoesNotEndWithPdf_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports._errorMessages = exports.throwIfPathDoesNotEndWithPdf = void 0;
/**
 * @description It throws error if the provided path does not end with `.pdf`.
*/
function throwIfPathDoesNotEndWithPdf(path) {
    if (!/\.pdf$/.test(path))
        throw Error(exports._errorMessages.pathDoesNotEndWithPdf(path));
}
exports.throwIfPathDoesNotEndWithPdf = throwIfPathDoesNotEndWithPdf;
exports._errorMessages = {
    pathDoesNotEndWithPdf: (path) => `Given path : ${path} does not end with ".pdf".`,
};
});

unwrapExports(throwIfPathDoesNotEndWithPdf_1);
var throwIfPathDoesNotEndWithPdf_2 = throwIfPathDoesNotEndWithPdf_1._errorMessages;
var throwIfPathDoesNotEndWithPdf_3 = throwIfPathDoesNotEndWithPdf_1.throwIfPathDoesNotEndWithPdf;

var outlinePdfCjsFactory_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.outlinePdfCjsFactory = void 0;



function outlinePdfCjsFactory(fs, pdfLib) {
    /**
     * @description Adds outline to an outline-less pdf.
     * @example
     * (async () => {
     *     await outlinePdf({
     *         loadPath: "absolute/or/relative/path/to/pdf/to/outline.pdf",
     *         savePath: "absolute/or/relative/path/to/save/outlined.pdf",
     *         // first column  : page number
     *         //                 negative for collapsing outline
     *         // second column : outline depth
     *         // third column  : outline title
     *         outline: `
     *               1||some title
     *              12|-|some title
     *             -30|--|some title
     *              34|---|some title
     *              35|---|some title
     *              60|--|some title
     *              67|-|some title
     *              80||some title
     *         `,
     *     });
     * })();
     */
    return async function outlinePdfCjs(_) {
        const { loadPath, outline, savePath } = _;
        const rejectIfPathExists = rejectIfPathExistsFactory_1.rejectIfPathExistsFactory(fs);
        throwIfPathDoesNotEndWithPdf_1.throwIfPathDoesNotEndWithPdf(loadPath);
        await rejectIfPathExists(savePath);
        const outlinePdf = outlinePdfFactory_1.outlinePdfFactory(pdfLib);
        await outlinePdf.loadPdf(fs.readFileSync(loadPath));
        outlinePdf.outline = outline;
        outlinePdf.applyOutlineToPdf();
        const pdf = await outlinePdf.savePdf();
        fs.writeFileSync(savePath, pdf);
    };
}
exports.outlinePdfCjsFactory = outlinePdfCjsFactory;
});

unwrapExports(outlinePdfCjsFactory_1);
var outlinePdfCjsFactory_2 = outlinePdfCjsFactory_1.outlinePdfCjsFactory;

var dist = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.outlinePdfCjsFactory = exports.outlinePdfFactory = void 0;

Object.defineProperty(exports, "outlinePdfFactory", { enumerable: true, get: function () { return outlinePdfFactory_1.outlinePdfFactory; } });

Object.defineProperty(exports, "outlinePdfCjsFactory", { enumerable: true, get: function () { return outlinePdfCjsFactory_1.outlinePdfCjsFactory; } });
});

var index = unwrapExports(dist);
var dist_1 = dist.outlinePdfCjsFactory;
var dist_2 = dist.outlinePdfFactory;

// export default index;
// export { dist_1 as outlinePdfCjsFactory, dist_2 as outlinePdfFactory };
