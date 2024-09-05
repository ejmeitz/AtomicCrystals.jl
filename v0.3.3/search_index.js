var documenterSearchIndex = {"docs":
[{"location":"#SimpleCrystals.jl","page":"Home","title":"SimpleCrystals.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"(Image: Build Status) (Image: License: MIT) (Image: Latest release) (Image: Documentation stable)","category":"page"},{"location":"","page":"Home","title":"Home","text":"SimpleCrystals.jl is an interface for creating crystal geometries for molecular simulation within Julia. SimpleCrystals implements all 3D and 2D Bravais lattices (e.g. FCC & BCC) and allows users to define a custom basis to create polyatomic Bravais lattices or to create non-Bravais crystal structures. The AtomsBase interface is implemented to make use with other Julian molecular simulation software simple. There is no support for reading in crystal structures from other software (e.g. CIF files). Check out Xtals.jl or AtomsIO.jl for that. SimpleCrystals is intended to provide a quick, lightweight method for generating atomic coordinates without leaving Julia.","category":"page"},{"location":"#Monoatomic-Bravais-Lattices:","page":"Home","title":"Monoatomic Bravais Lattices:","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Whenever possible crystals are implemented using a conventional unit cell so that patterning a simulation cell is simple. A trinclinic boundary will work for the remaining lattices.","category":"page"},{"location":"","page":"Home","title":"Home","text":"SimpleCrystals.jl re-exports Unitful.jl and StatcArrays.jl and can handle any atomic symbols from PeriodicTable.jl. For example, the code below creates an FCC crystal of carbon with a conventional cell that is 5.4 Angstroms. The cell is patterened 4 times in the x, y, and z directions. The coordinates can be obtained in code with the atoms member variable or saved to a XYZ file with to_xyz().","category":"page"},{"location":"","page":"Home","title":"Home","text":"a = 5.4u\"Å\"\nfcc_crystal = FCC(a, :C, SVector(4,4,4))\natoms = fcc_crystal.atoms\nto_xyz(fcc_crystal, raw\"./positions_fcc.xyz\")\n\n#Equivalently if you do not want to specify an atomic species\na = 5.4u\"Å\"\nfcc_crystal = FCC(a, 12.01u\"g/mol\", SVector(4,4,4))\natoms = fcc_crystal.atoms\nto_xyz(fcc_crystal, raw\"./positions_fcc.xyz\")","category":"page"},{"location":"#D-Bravais-Lattices","page":"Home","title":"3D Bravais Lattices","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"All 3D Bravais lattices created from the SimpleCrystal's API and visualized in OVITO. The radius of the atoms is chosen arbitrarily in OVITO. The full list of implemented functions can be found here. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"Crystal Family Primitive Base Centered Body Centered Face Centered\nCubic<br>a = b = c<br>α = β = γ = 90° (Image: 1)  (Image: 2) (Image: 2)\nTriclinic<br>a ≠ b ≠ c<br>α ≠ β ≠ γ (Image: 1)   \nMonoclinic<br>a ≠ b ≠ c<br>α = γ = 90°, β (Image: 1) (Image: 2)  \nOrthorhombic<br>a ≠ b ≠ c<br>α = β = γ = 90° (Image: 1) (Image: 2) (Image: 2) (Image: 2)\nTetragonal<br>a = b ≠ c<br>α = β = γ = 90° (Image: 1)  (Image: 2) \nHexagonal (Rhombohedral)<br>a = b = c<br>α = β = γ (Image: 1)   \nHexagonal<br>a, c<br>α = β = 90°, γ = 120° (Image: 1)   ","category":"page"},{"location":"#Other-3D-Structrues","page":"Home","title":"Other 3D Structrues","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Diamond and HCP are also implemented as part of the API: ","category":"page"},{"location":"","page":"Home","title":"Home","text":"Diamond HCP\n(Image: Diamond) (Image: HCP)","category":"page"},{"location":"#D-Bravais-Lattices-2","page":"Home","title":"2D Bravais Lattices","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"All 2D Bravais lattices created from the SimpleCrystal's API and visualized in OVITO. The full list of implemented functions can be found here. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"Crystal Family Primitive Centered\nMonoclinic<br>a ≠ b<br>θ ≠ 90° (Image: Primitive) \nOrthorhombic<br>a ≠ b<br>θ = 90° (Image: Primitive) (Image: Centered)\nTetragonal<br>a = b<br>θ = 90° (Image: Primitive) \nHexagonal<br>θ = 120° (Image: Primitive) ","category":"page"},{"location":"#Other-2D-Structures","page":"Home","title":"Other 2D Structures","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The honeycomb lattice is the only 2D non-bravais lattice implemented as part of the SimpleCrystals API.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Honeycomb\n(Image: Honeycomb)","category":"page"},{"location":"#User-Defined-Crystal-Structures","page":"Home","title":"User Defined Crystal Structures","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The SimpleCrystals API is not exhaustive, but provides an interface to create non-bravais crystals and polyatomic crystals. For example, the Diamond crystal structure (which is a part of the API) is defined as simple cubic Bravais lattice with an 8 atom basis. Diamond is more naturally thought of as an FCC lattice with a 2 atom basis, but that would require a triclinic boundary.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The code below defines the BravaisLattice() object as a primitive, cubic lattice (simple cubic) with lattice parameter a. Then the basis is constructed as a list of Atom() objects. In this example, each basis atom is the same element but that could easily be changed. Finally, the Crystal() object is constructed from the BravaisLattice object and the list of basis atoms.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Diamond(a, atomic_mass::Number, N::SVector{3}; charge = 0.0u\"C\")\n    lattice = BravaisLattice(CubicLattice(a), Primitive())\n    basis = [Atom([zero(a),zero(a),zero(a)],atomic_mass, charge = charge),\n             Atom([zero(a), 0.5*a, 0.5*a], atomic_mass, charge = charge),\n             Atom([0.5*a, zero(a), 0.5*a], atomic_mass, charge = charge),\n             Atom([0.5*a, 0.5*a, zero(a)], atomic_mass, charge = charge),\n             Atom([0.25*a, 0.25*a, 0.25*a], atomic_mass, charge = charge),\n             Atom([0.25*a, 0.75*a, 0.75*a], atomic_mass, charge = charge),\n             Atom([0.75*a, 0.25*a, 0.75*a], atomic_mass, charge = charge),\n             Atom([0.75*a, 0.75*a, 0.25*a], atomic_mass, charge = charge)]\n    return Crystal(lattice,basis,N)\nend","category":"page"},{"location":"","page":"Home","title":"Home","text":"Similarly, we can create NaCl (not in the API) which can be thought of as a simple cubic lattice with an 8 atom basis or two intertwined FCC lattices.","category":"page"},{"location":"","page":"Home","title":"Home","text":"2-Atom Basis SC:","category":"page"},{"location":"","page":"Home","title":"Home","text":"function NaCl1(a, N::SVector{3})\n    lattice = BravaisLattice(CubicLattice(a), Primitive())\n    basis = [Atom(:Na, [zero(a), zero(a), zero(a)], charge = 1.0u\"q\"),\n             Atom(:Na, [0.5*a,zero(a),0.5*a], charge = 1.0u\"q\"),\n             Atom(:Na, [zero(a), 0.5*a, 0.5*a], charge = 1.0u\"q\"),\n             Atom(:Na, [0.5*a,0.5*a,zero(a)], charge = 1.0u\"q\"),\n             Atom(:Cl, [0.5*a, zero(a), zero(a)], charge = -1.0u\"q\"),\n             Atom(:Cl, [zero(a), 0.5*a, zero(a)], charge = -1.0u\"q\"),\n             Atom(:Cl, [zero(a),zero(a),0.5*a], charge = -1.0u\"q\"),\n             Atom(:Cl, [0.5*a, 0.5*a, 0.5*a], charge = -1.0u\"q\")]\n    return Crystal(lattice,basis,N)\nend","category":"page"},{"location":"","page":"Home","title":"Home","text":"Intertwined FCC:","category":"page"},{"location":"","page":"Home","title":"Home","text":"function NaCl2(a, N::SVector{3})\n    lattice = BravaisLattice(CubicLattice(a), FaceCentered())\n    basis = [Atom(:Na, [zero(a), zero(a), zero(a)], charge = 1.0u\"q\"),\n             Atom(:Cl, [0.5*a, zero(a), zero(a)], charge = -1.0u\"q\")]\n    return Crystal(lattice,basis,N)\nend","category":"page"},{"location":"","page":"Home","title":"Home","text":"Both methods yield the same structure with periodic boundary conditions, but the first function uses a conventional cell so the result is much easier to see and create a simulation box for. Whenever possible use a conventional cell (simple cubic lattice). Note that to use both of these functions the lattice parameter a is the distance between Na atoms (or Cl atoms) not the Na-Cl distance as the basis places the atoms at the proper 0.5*a spacing.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Conventional Cell FCC Unit Cell\n(Image: Conventional Cell) (Image: FCC Unit Cell)","category":"page"},{"location":"#File-I/O","page":"Home","title":"File I/O","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Using one of the built-in crystal objects (e.g. FCC) or a user-defined crystal you can call the to_xyz() function to print out a .xyz file with a chosen number of unit cells. For example, to get the coordinates for 4 unit-cells in the x, y and z directions for FCC you could use the following code:","category":"page"},{"location":"","page":"Home","title":"Home","text":"a = 5.4u\"Å\"\nfcc_crystal = FCC(a, :C, SVector(4,4,4))\nto_xyz(fcc_crystal, raw\"C:\\Users\\ejmei\\Desktop\\positions_fcc.xyz\")","category":"page"},{"location":"","page":"Home","title":"Home","text":"To get the list of atoms in code you can use the atoms member variable. The code below will return the array of atoms that the to_xyz() function builds internally. Alternatively, you can loop over the crystal object which will iterate through the crystal.atoms list.","category":"page"},{"location":"","page":"Home","title":"Home","text":"a = 5.4u\"Å\"\nfcc_crystal = FCC(a, :C, SVector(2,2,2))\natoms = fcc_crystal.atoms\n\nfor atom in fcc_crystal\n    #do something\nend","category":"page"}]
}
