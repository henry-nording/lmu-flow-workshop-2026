# Glossary

The terms used in the workshop, in the order they come up. Each entry says what the term means and why it matters for your data.

## The basics

### Machine learning

Methods that find patterns in data instead of following rules a person wrote down. In this workshop: algorithms that group cells or draw maps without you setting gates.

### Unsupervised and supervised learning

Unsupervised methods get no labels and look for structure on their own; clustering and UMAP belong here. Supervised methods learn from examples that already carry a label, for example cells you gated by hand.

### High-dimensional data

Every cell is one point with as many coordinates as you measured markers. With 20 markers there are 190 different two-marker plots, too many to gate through by hand.

## Preprocessing

### Preprocessing

Every step between the unmixed or compensated file and the analysis: quality control, removing debris, doublets and dead cells, transformation, and alignment between measurement days. A mistake here shows up later as a wrong biological result.

### Quality control (QC)

A check of the measurement over time. A clog, an air bubble or a changing flow rate shifts the signal for a while; those time windows are removed. Tools: FlowAI, PeacoQC.

### Doublet

Two cells that passed the laser together and were recorded as one event. You find doublets in a plot of FSC-A against FSC-H. A doublet of a T cell and a B cell looks like a CD3+ CD19+ cell that does not exist.

### Dead cells and viability dye

Dead cells bind antibodies unspecifically and appear positive for many markers. A viability dye stains them so that you can exclude them.

### Transformation

A rescaling of the raw intensities (arcsinh, logicle or biexponential) so that negative and positive populations are both resolved. Clustering and maps are calculated on the transformed values, so wrong settings can split one population in two or merge two into one.

### Batch effect

A technical difference between measurement days, staining batches or instruments. It can look like a biological difference between groups. The best protection is the design: spread the groups over the days and run the same control sample every day.

## Clustering and maps

### Downsampling

Taking a random subset of events, usually the same number from every sample. It keeps the calculation fast and stops one large sample from dominating the result.

### Concatenation

Joining several samples into one file, with an extra parameter that records which sample each cell came from. All cells are then clustered together and can be compared.

### Clustering

An algorithm sorts cells with similar marker expression into groups. The result is a cluster number for every cell, not a name.

### FlowSOM

A widely used clustering method for cytometry data. It first places the cells on a grid of nodes (for example 10 × 10 = 100 nodes) and then merges similar nodes into metaclusters.

### Metacluster

A group of similar FlowSOM nodes. You choose how many there are: too few merge different cell types, too many split one cell type.

### Dimensionality reduction (tSNE, UMAP)

A method that draws all markers into one two-dimensional map in which similar cells lie close together. The map is for looking, not for measuring: distances between islands are not reliable, and the picture changes with the settings and the random start.

## Reading the result

### Heatmap

A table of clusters against markers, coloured by the median expression of each marker in each cluster. It is the main tool for deciding what a cluster is.

### Annotation

Giving a cluster a biological name from its marker pattern, for example CD3+ CD4+ CD19− = CD4 T cell. This is a judgement: software can suggest a name, a person has to check it.

### Differential abundance

A comparison of how frequent a cluster is in one group against another. The unit is the sample or donor, not the single cell: eight samples give eight values, however many cells were measured.
